import { NextResponse } from "next/server";
import { parseInquiry, sendInquiry, verifyTurnstile, type InquiryInput } from "@/app/lib/inquiry";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const recentRequests = new Map<string, number[]>();

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 403 });
  }

  const ip = clientIp(request);

  let input: InquiryInput;
  try {
    input = (await request.json()) as InquiryInput;
  } catch {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const inquiry = parseInquiry(input);
  if (!inquiry) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  try {
    const human = await verifyTurnstile(input.turnstileToken, ip);
    if (!human) {
      return NextResponse.json({ ok: false, error: "turnstile" }, { status: 400 });
    }
  } catch (error) {
    console.error("Turnstile verification failed", error);
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  try {
    await sendInquiry(inquiry);
  } catch (error) {
    console.error("Inquiry email failed", error);
    const missingConfig = error instanceof Error && error.message.endsWith("is missing");
    return NextResponse.json(
      { ok: false, error: missingConfig ? "unavailable" : "send" },
      { status: missingConfig ? 503 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentRequests.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (hits.length >= MAX_REQUESTS) {
    recentRequests.set(ip, hits);
    return true;
  }
  hits.push(now);
  recentRequests.set(ip, hits);
  if (recentRequests.size > 1000) {
    const oldest = recentRequests.keys().next().value;
    if (oldest) recentRequests.delete(oldest);
  }
  return false;
}
