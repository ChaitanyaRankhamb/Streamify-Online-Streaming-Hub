
import { HandleUserLoginController } from "@/controllers/login";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { status, body } = await HandleUserLoginController(req, res);
  return NextResponse.json(body, { status });
}
