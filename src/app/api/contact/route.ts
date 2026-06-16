import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { buildContactEmail } from "@/lib/contact-email";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  return false;
}

function getSafeBodyValue(body: unknown, key: string) {
  if (!body || typeof body !== "object") {
    return "";
  }

  const value = (body as Record<string, unknown>)[key];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const honeypot = getSafeBodyValue(body, "website");

  if (honeypot) {
    return NextResponse.json({
      success: true,
      message: "Message received."
    });
  }

  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please try again shortly."
      },
      { status: 429 }
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Contact form is missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL.");

    return NextResponse.json(
      {
        success: false,
        message: "Contact email is not configured yet."
      },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const origin =
    parsed.data.origin ||
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "Website contact form";
  const email = buildContactEmail(parsed.data, origin);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: email.subject,
      text: email.text,
      html: email.html,
      replyTo: parsed.data.email
    });

    if (error) {
      console.error("Resend contact error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Could not send the message. Please try again later."
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Contact send failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not send the message. Please try again later."
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Message sent. I will get back to you soon."
  });
}
