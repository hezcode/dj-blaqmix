import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { getClientIp, isRateLimited, isSubmissionTooFast } from "@/lib/form-security";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  enquiryType?: string;
  message?: string;
  company?: string;
  startedAt?: number;
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const ownerEmail = process.env.MAIL_TO;

    if (!ownerEmail) {
      return NextResponse.json(
        { error: "Destination email is not configured." },
        { status: 500 },
      );
    }

    const name = payload.name?.trim() || "";
    const email = payload.email?.trim() || "";
    const phone = payload.phone?.trim() || "";
    const enquiryType = payload.enquiryType?.trim() || "";
    const message = payload.message?.trim() || "";
    const company = payload.company?.trim() || "";

    if (company) {
      return NextResponse.json({ ok: true });
    }

    const ip = getClientIp(request);
    if (isRateLimited(`contact:${ip}`)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    if (isSubmissionTooFast(payload.startedAt ?? null, 2500)) {
      return NextResponse.json(
        { error: "Submission rejected. Please try again." },
        { status: 400 },
      );
    }

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }
    if (!phone || phone.length < 7) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 },
      );
    }
    if (!enquiryType) {
      return NextResponse.json(
        { error: "Please select an enquiry type." },
        { status: 400 },
      );
    }
    if (!message || message.length < 20) {
      return NextResponse.json(
        { error: "Please provide more details (min 20 characters)." },
        { status: 400 },
      );
    }

    const submittedAt = new Date().toISOString();

    await sendMail({
      to: ownerEmail,
      replyTo: email,
      subject: `New contact enquiry from ${name}`,
      html: `
        <h2>New Contact Enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Enquiry Type:</strong> ${escapeHtml(enquiryType)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
        <p><strong>Submitted At:</strong> ${escapeHtml(submittedAt)}</p>
      `,
    });

    await sendMail({
      to: email,
      subject: "We received your enquiry - DJ Blaqmix",
      html: `
        <h2>Thanks for contacting DJ Blaqmix</h2>
        <p>Hello ${escapeHtml(name)},</p>
        <p>We have received your enquiry and our team will respond shortly.</p>
        <p><strong>Enquiry Type:</strong> ${escapeHtml(enquiryType)}</p>
        <p>Regards,<br/>DJ Blaqmix Team</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact submission error", error);
    return NextResponse.json(
      { error: "Unable to submit enquiry right now. Please try again." },
      { status: 500 },
    );
  }
}
