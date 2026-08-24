import { NextResponse } from "next/server";
import { contactServices, type ContactFormPayload, type ContactService } from "@/lib/contact";
import { sendContactEmail } from "@/lib/email";
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function parsePayload(body: unknown): ContactFormPayload | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request." };
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const service = typeof data.service === "string" ? data.service.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || name.length < 2) {
    return { error: "Please enter your name." };
  }

  if (!isValidPhone(phone)) {
    return { error: "Please enter a valid phone number." };
  }

  if (email && !isValidEmail(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!contactServices.includes(service as ContactService)) {
    return { error: "Please select a service." };
  }

  if (!message || message.length < 10) {
    return { error: "Please enter a message (at least 10 characters)." };
  }

  return {
    name,
    phone,
    email: email || undefined,
    service: service as ContactService,
    message,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parsePayload(body);

    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    await sendContactEmail(parsed);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try WhatsApp or call directly." },
      { status: 500 }
    );
  }
}
