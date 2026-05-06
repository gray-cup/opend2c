import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";
import { transferBrand } from "@/lib/scraper-store";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Ctx) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const toEmail = typeof body?.email === "string" ? body.email.trim() : "";

  if (!toEmail) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const { error } = await transferBrand(Number(id), session.user.id, toEmail);
  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ transferred: true });
}
