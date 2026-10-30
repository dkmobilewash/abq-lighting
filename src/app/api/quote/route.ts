import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quoteSchema";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot tripped: pretend success so bots don't retry.
  if (body && typeof body === "object" && (body as Record<string, unknown>).company_website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed", issues: parsed.error.issues }, { status: 422 });
  }

  const lead = { ...parsed.data, company_website: undefined, receivedAt: new Date().toISOString(), source: "website-quote-form" };
  const webhook = process.env.QUOTE_WEBHOOK_URL;

  if (!webhook) {
    console.warn("[quote] QUOTE_WEBHOOK_URL is not set; lead not forwarded:", lead.email);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[quote] webhook failed", err);
    return NextResponse.json({ ok: false, error: "Could not submit right now. Please call us." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, forwarded: true });
}
