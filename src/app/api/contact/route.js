import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <contact@anycompare.app>",
      to: ["venkatbalaji2004@gmail.com"],
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #0F111A; color: #E2E8F0; padding: 2rem; border-radius: 8px; border: 1px solid #2D3748;">
          <h2 style="color: #38BDF8; border-bottom: 1px solid #2D3748; padding-bottom: 1rem;">New Contact Request</h2>
          <p><span style="color: #A78BFA;">name</span>: <span style="color: #34D399;">"${name}"</span></p>
          <p><span style="color: #A78BFA;">email</span>: <span style="color: #34D399;">"${email}"</span></p>
          <p style="margin-top: 1rem;"><span style="color: #A78BFA;">message</span>:</p>
          <pre style="background: #1A1D24; padding: 1rem; border-radius: 4px; border-left: 3px solid #38BDF8; white-space: pre-wrap; color: #94A3B8;">${message}</pre>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ status: 200, message: "Payload delivered successfully. Connection established.", id: data.id });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
