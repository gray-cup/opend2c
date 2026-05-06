import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { techSolutionsRequests } from "@/lib/schema";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  company: z.string().min(1).max(100),
  interest: z.enum(["farms", "d2c", "both"]),
  description: z.string().min(10).max(2000),
  phone: z.string().max(30).optional(),
  turnstileToken: z.string().min(1, "Security check token is required"),
});

async function verifyTurnstile(token: string): Promise<boolean> {
  const form = new FormData();
  form.append("secret", process.env.TURNSTILE_SECRET_KEY!);
  form.append("response", token);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form },
  );
  const data = await res.json();
  return data.success === true;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { turnstileToken, ...data } = parsed.data;

  const turnstileOk = await verifyTurnstile(turnstileToken);
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Security check failed" },
      { status: 403 },
    );
  }

  try {
    await db.insert(techSolutionsRequests).values(data);
  } catch (err) {
    console.error("DB insert error:", err);
    return NextResponse.json(
      { error: "Failed to save request" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
