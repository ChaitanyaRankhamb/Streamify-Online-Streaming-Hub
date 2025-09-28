interface VerificationEmailProps {
  email: string;
  code: string;
  token: string;
}

export default function VerificationEmailTemplate({ email, code, token }: VerificationEmailProps) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px;">
      <h1 style="color: #1e3a8a;">Verify Your Email</h1>
      <p>Hello <strong>${email}</strong>,</p>
      <p>Thank you for signing up! Please use the verification code below to confirm your email address:</p>
      <p style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; letter-spacing: 4px;">
        ${code}
      </p>
      <p>Or you can verify your email instantly by clicking the link below:</p>
      <p style="text-align: center; margin: 20px 0;">
        <a href="${verificationUrl}" style="background-color: #1e3a8a; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
          Verify Email
        </a>
      </p>
      <p>This code will expire in 1 hour. If you did not request this, please ignore this email.</p>
      <p>Thanks,<br/>The Team</p>
    </div>
  `;
}
