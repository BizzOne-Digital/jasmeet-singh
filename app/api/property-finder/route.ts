import { NextResponse } from "next/server";
import { sendPropertyFinderEmail } from "@/lib/email";
import type { PropertyFinderPayload } from "@/lib/property-finder";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function parsePayload(body: unknown): PropertyFinderPayload | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request." };
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const selections = data.selections;

  if (!name || name.length < 2) {
    return { error: "Please enter your name." };
  }

  if (!isValidPhone(phone)) {
    return { error: "Please enter a valid WhatsApp number." };
  }

  if (email && !isValidEmail(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!selections || typeof selections !== "object") {
    return { error: "Property preferences are missing." };
  }

  const selectionData = selections as Record<string, unknown>;
  const parsedSelections = {
    goal: typeof selectionData.goal === "string" ? selectionData.goal : "",
    sector: typeof selectionData.sector === "string" ? selectionData.sector : "",
    area: typeof selectionData.area === "string" ? selectionData.area : "",
    propertyType: typeof selectionData.propertyType === "string" ? selectionData.propertyType : "",
    budget: typeof selectionData.budget === "string" ? selectionData.budget : "",
    timeline: typeof selectionData.timeline === "string" ? selectionData.timeline : "",
  };

  if (!parsedSelections.goal) {
    return { error: "Please complete all Property Finder steps." };
  }

  return {
    name,
    phone,
    email: email || undefined,
    selections: parsedSelections,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parsePayload(body);

    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    await sendPropertyFinderEmail(parsed);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Property Finder error:", error);
    return NextResponse.json(
      { error: "Unable to send your inquiry right now. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
