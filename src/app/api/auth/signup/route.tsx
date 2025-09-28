import hashPassword from "@/lib/bcrypt"
import { connectDB } from "@/lib/mongoose"
import UserModel from "@/models/user"
import crypto from "crypto"
import sendEmail from "@/lib/sendEmail" // your email sending util

export async function POST(request: Request) {
  await connectDB()

  try {
    const { username, email, password } = await request.json()

    // check if username exists
    const existingUserByUsername = await UserModel.findOne({ username })
    if (existingUserByUsername) {
      return new Response(
        JSON.stringify({ success: false, message: "Username already exists." }),
        { status: 400 }
      )
    }

    // check if email exists
    const existingUserByEmail = await UserModel.findOne({ email })
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return new Response(
          JSON.stringify({ success: false, message: "Email already registered." }),
          { status: 400 }
        )
      } else {
        // overwrite unverified user
        const hashedPassword = await hashPassword(password)
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const verificationCodeExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
        const verificationToken = crypto.randomBytes(32).toString("hex")

        existingUserByEmail.username = username
        existingUserByEmail.password = hashedPassword
        existingUserByEmail.verificationCode = verificationCode
        existingUserByEmail.verificationCodeExpiry = verificationCodeExpiry
        existingUserByEmail.verificationToken = verificationToken

        await existingUserByEmail.save()

        // send verification email
        await sendEmail(email, verificationCode, verificationToken)

        return new Response(
          JSON.stringify({
            success: true,
            message: "User created. Please verify your email.",
          }),
          { status: 201 }
        )
      }
    }

    // new user
    const hashedPassword = await hashPassword(password)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const verificationCodeExpiry = new Date(Date.now() + 60 * 60 * 1000)
    const verificationToken = crypto.randomBytes(32).toString("hex")

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpiry,
      verificationToken,
    })

    // send verification email
    await sendEmail(email, verificationCode, verificationToken)

    return new Response(
      JSON.stringify({
        success: true,
        message: "User created. Please verify your email.",
      }),
      { status: 201 }
    )
  } catch (error) {
    console.error("Error during signup:", error)
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    )
  }
}
