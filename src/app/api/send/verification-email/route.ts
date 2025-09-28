import { Resend } from 'resend';
import VerificationEmailTemplate from '@/components/email/page';

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY!);

export async function POST(request: Request) {
  try {
    const { email, code, token } = await request.json();

    if (!email || !code || !token) {
      return new Response(
        JSON.stringify({ error: 'Missing email, code, or token' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate HTML from the template function
    const html = VerificationEmailTemplate({ email, code, token });

    // Send email via Resend
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Verify Your Email',
      html,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Verification email sent.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error sending verification email:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
