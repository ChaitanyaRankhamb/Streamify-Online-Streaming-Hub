import { connectDB } from "@/lib/mongoose";
import UserModel from "@/models/user";

export async function POST(request: Request) {
  await connectDB();

  try {
    const { token, code } = await request.json();

    if (!token || !code) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid request" }),
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid or expired token" }),
        { status: 400 }
      );
    }

    if (user.verificationCode !== code) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Incorrect verification code",
        }),
        { status: 400 }
      );
    }

    if (user.verificationCodeExpiry < new Date()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Verification code expired",
        }),
        {
          status: 400,
        }
      );
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined; // remove token
    user.verificationCode = undefined; // remove code
    user.verificationCodeExpiry = undefined;
    await user.save();

    return new Response(
      JSON.stringify({ success: true, message: "Email verified successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify code error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
