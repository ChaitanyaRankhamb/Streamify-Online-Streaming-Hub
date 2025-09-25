export const runtime = "nodejs";
import { HandleUserRegistrationController } from "@/controllers/signup";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { status, body } = await HandleUserRegistrationController(req);
    console.log("status : ", status , body)
    return NextResponse.json(body, { status });
  } catch (err) {
    console.error("signup route error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
