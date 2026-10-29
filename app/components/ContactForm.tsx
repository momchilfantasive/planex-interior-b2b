"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type FormStatus = { tone: "error" | "success"; text: string } | null;
type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "dark";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

const ERRORS: Record<string, string> = {
  validation: "Проверете полетата и опитайте отново.",
  turnstile: "Проверката за сигурност не мина. Опитайте отново.",
  rate: "Изпратени са твърде много запитвания. Опитайте след няколко минути.",
  unavailable: "Формата временно не приема запитвания. Пишете ни директно по електронната поща.",
  send: "Не успяхме да изпратим запитването. Опитайте отново или ни пишете директно.",
};

export default function ContactForm() {
  const slotRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [token, setToken] = useState("");
  const [widgetFailed, setWidgetFailed] = useState(false);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  useEffect(() => {
    if (!SITE_KEY || !slotRef.current) return;
    const slot = slotRef.current;
    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (cancelled || !window.turnstile || widgetId.current) return;
        widgetId.current = window.turnstile.render(slot, {
          sitekey: SITE_KEY,
          action: "contact",
          theme: "dark",
          callback: (nextToken) => setToken(nextToken),
          "expired-callback": () => setToken(""),
          "error-callback": () => {
            setToken("");
            setWidgetFailed(true);
          },
        });
      })
      .catch(() => {
        if (!cancelled) setWidgetFailed(true);
      });

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  function resetWidget() {
    setToken("");
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    if (!token) {
      setStatus({ tone: "error", text: "Потвърдете проверката за сигурност, преди да изпратите." });
      return;
    }

    const data = new FormData(form);
    setPending(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          surname: data.get("surname"),
          email: data.get("email"),
          phone: data.get("phone"),
          project: data.get("project"),
          message: data.get("message"),
          privacy: data.get("privacy") === "yes",
          turnstileToken: token,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !payload?.ok) {
        setStatus({ tone: "error", text: ERRORS[payload?.error ?? ""] ?? ERRORS.send });
        resetWidget();
        return;
      }

      setStatus({ tone: "success", text: "Благодарим ви. Запитването е изпратено и ще се свържем с вас." });
    } catch {
      setStatus({ tone: "error", text: ERRORS.send });
      resetWidget();
    } finally {
      setPending(false);
    }
  }

  const canSubmit = Boolean(SITE_KEY) && !widgetFailed && !pending;

  if (status?.tone === "success") {
    return (
      <p className="formSuccess" role="status">
        {status.text}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Изпратете ни запитване</h3>
      <div className="formRow">
        <label>
          Име
          <input name="name" autoComplete="given-name" required maxLength={80} />
        </label>
        <label>
          Фамилия
          <input name="surname" autoComplete="family-name" maxLength={80} />
        </label>
      </div>
      <div className="formRow">
        <label>
          E-mail
          <input name="email" type="email" autoComplete="email" required maxLength={120} />
        </label>
        <label>
          Телефон
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
      </div>
      <label>
        Тип проект
        <select name="project" required defaultValue="">
          <option value="" disabled>
            Изберете
          </option>
          <option>Жилище</option>
          <option>Офис или бизнес пространство</option>
          <option>Търговска площ</option>
          <option>Друго</option>
        </select>
      </label>
      <label>
        Съобщение
        <textarea name="message" required maxLength={4000} />
      </label>
      <label className="check">
        <input type="checkbox" name="privacy" value="yes" required />
        <span>Приемам политиката за поверителност.</span>
      </label>
      <div className="turnstileSlot" ref={slotRef} />
      {!SITE_KEY || widgetFailed ? (
        <p className="formNotice" data-tone="error" role="alert">
          Проверката за сигурност не е налична. Пишете ни директно по електронната поща.
        </p>
      ) : null}
      {status?.tone === "error" ? (
        <p className="formNotice" data-tone="error" role="alert">
          {status.text}
        </p>
      ) : null}
      <button type="submit" disabled={!canSubmit}>
        {pending ? "Изпращане…" : "Изпратете"}
      </button>
    </form>
  );
}

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
  if (existing) return waitForScript(existing);

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.dataset.turnstile = "true";
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(script);
  });
}

function waitForScript(script: HTMLScriptElement) {
  if (script.dataset.loaded === "true" || window.turnstile) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true },
    );
    script.addEventListener("error", () => reject(new Error("Turnstile failed to load")), { once: true });
  });
}
