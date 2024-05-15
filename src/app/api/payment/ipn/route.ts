import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  return NextResponse.redirect(new URL("/payment/ipn", req.url), 303);
}
