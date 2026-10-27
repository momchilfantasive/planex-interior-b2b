import nodemailer from "nodemailer";

const PROJECT_TYPES = [
  "Жилище",
  "Офис или бизнес пространство",
  "Търговска площ",
  "Друго",
] as const;

const LIMITS = {
  name: 80,
  surname: 80,
  email: 120,
  phone: 40,
  message: 4000,
} as const;

export type InquiryInput = {
  name?: unknown;
  surname?: unknown;
  email?: unknown;
  phone?: unknown;
  project?: unknown;
  message?: unknown;
  privacy?: unknown;
  turnstileToken?: unknown;
};

export type Inquiry = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  project: (typeof PROJECT_TYPES)[number];
  message: string;
};

export type InquiryError = "validation" | "turnstile" | "unavailable" | "send";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s.-]+$/;

export function parseInquiry(input: InquiryInput): Inquiry | null {
  if (input.privacy !== true) return null;

  const name = cleanText(input.name, LIMITS.name);
  const surname = cleanText(input.surname, LIMITS.surname);
  const email = cleanText(input.email, LIMITS.email).toLowerCase();
  const phone = cleanText(input.phone, LIMITS.phone);
  const project = cleanText(input.project, 80);
  const message = cleanText(input.message, LIMITS.message, true);

  if (!name || !email || !message) return null;
  if (!EMAIL_PATTERN.test(email)) return null;
  if (phone && !PHONE_PATTERN.test(phone)) return null;
  if (!isProjectType(project)) return null;

  return { name, surname, email, phone, project, message };
}

export async function verifyTurnstile(token: unknown, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const response = typeof token === "string" ? token.trim() : "";
  if (!secret) throw new Error("TURNSTILE_SECRET_KEY is missing");
  if (!response || response.length > 2048) return false;

  const body = new URLSearchParams({
    secret,
    response,
    remoteip: remoteIp,
  });

  const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!result.ok) return false;

  const payload = (await result.json()) as { success?: boolean; action?: string };
  return payload.success === true && (!payload.action || payload.action === "contact");
}

export async function sendInquiry(inquiry: Inquiry) {
  const host = requiredEnv("SMTP_HOST");
  const from = requiredEnv("SMTP_FROM");
  const to = requiredEnv("SMTP_TO");
  const port = Number(process.env.SMTP_PORT || 587);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT is invalid");
  }

  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD;
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE.trim() === "true"
    : port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user ? { user, pass: pass ?? "" } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const fullName = [inquiry.name, inquiry.surname].filter(Boolean).join(" ");

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: inquiry.email,
      subject: `Запитване от сайта: ${fullName}`,
      text: [
        "Ново запитване от planexinterior.bg",
        "",
        `Име: ${inquiry.name}`,
        `Фамилия: ${inquiry.surname || "—"}`,
        `E-mail: ${inquiry.email}`,
        `Телефон: ${inquiry.phone || "—"}`,
        `Тип проект: ${inquiry.project}`,
        "",
        "Съобщение:",
        inquiry.message,
      ].join("\n"),
    });
  } finally {
    transporter.close();
  }
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is missing`);
  return value;
}

function cleanText(value: unknown, max: number, allowNewlines = false) {
  if (typeof value !== "string") return "";
  let text = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    const isNewline = code === 10 || code === 13;
    if (isNewline) {
      if (allowNewlines) text += char;
      else if (text && !text.endsWith(" ")) text += " ";
      continue;
    }
    if (code < 32 && code !== 9) continue;
    if (code === 127) continue;
    text += char;
  }
  return text.trim().slice(0, max);
}

function isProjectType(value: string): value is Inquiry["project"] {
  return PROJECT_TYPES.some((type) => type === value);
}
