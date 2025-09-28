import * as React from "react";

interface VerificationEmailProps {
  email: string;
  code: string;
  token: string;
}

export default function VerificationEmailTemplate({ email, code, token }: VerificationEmailProps) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        lineHeight: "1.5",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#1e3a8a" }}>Verify Your Email</h1>
      <p>
        Hello <strong>{email}</strong>,
      </p>
      <p>
        Thank you for signing up! Please use the verification code below to confirm your email address:
      </p>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "20px 0",
          letterSpacing: "4px",
        }}
      >
        {code}
      </p>
      <p>
        Or you can verify your email instantly by clicking the link below:
      </p>
      <p style={{ textAlign: "center", margin: "20px 0" }}>
        <a
          href={verificationUrl}
          style={{
            backgroundColor: "#1e3a8a",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Verify Email
        </a>
      </p>
      <p>
        This code will expire in 1 hour. If you did not request this, please ignore this email.
      </p>
      <p>Thanks,<br />The Team</p>
    </div>
  );
}
