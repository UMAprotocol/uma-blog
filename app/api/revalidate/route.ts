import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { env } from "@/app/env";

export function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get("x-vercel-reval-key");

  if (secret !== env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // revalidate ALL data. for home page and the articles pages
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
