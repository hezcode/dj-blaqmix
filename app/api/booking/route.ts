import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/nodemailer/mailer";
import {
  getClientIp,
  isRateLimited,
  isSubmissionTooFast,
} from "@/lib/form-security";

export const runtime = "nodejs";

type BookingPayload = {
  name?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  eventTime?: string;
  eventType?: string;
  venue?: string;
  numberOfGuests?: string;
  budget?: string;
  specialRequests?: string;
  company?: string;
  startedAt?: number;
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isPastDate = (value: string) =>
  value < new Date().toISOString().split("T")[0];

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as BookingPayload;
    const bookingReplyTo = process.env.BOOKING_REPLY_TO;

    if (!bookingReplyTo) {
      return NextResponse.json(
        { error: "Destination email is not configured." },
        { status: 500 },
      );
    }

    const name = payload.name?.trim() || "";
    const email = payload.email?.trim() || "";
    const phone = payload.phone?.trim() || "";
    const eventDate = payload.eventDate?.trim() || "";
    const eventTime = payload.eventTime?.trim() || "";
    const eventType = payload.eventType?.trim() || "";
    const venue = payload.venue?.trim() || "";
    const numberOfGuests = payload.numberOfGuests?.trim() || "";
    const budget = payload.budget?.trim() || "";
    const specialRequests = payload.specialRequests?.trim() || "";
    const company = payload.company?.trim() || "";

    if (company) {
      return NextResponse.json({ ok: true });
    }

    const ip = getClientIp(request);
    if (isRateLimited(`booking:${ip}`)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    if (isSubmissionTooFast(payload.startedAt ?? null, 3000)) {
      return NextResponse.json(
        { error: "Submission rejected. Please try again." },
        { status: 400 },
      );
    }

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 },
      );
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
    if (!eventDate || isPastDate(eventDate)) {
      return NextResponse.json(
        { error: "Please select a valid event date." },
        { status: 400 },
      );
    }
    if (!eventTime) {
      return NextResponse.json(
        { error: "Event time is required." },
        { status: 400 },
      );
    }
    if (!eventType) {
      return NextResponse.json(
        { error: "Event type is required." },
        { status: 400 },
      );
    }
    if (!venue || venue.length < 5) {
      return NextResponse.json(
        { error: "Please enter a valid venue address." },
        { status: 400 },
      );
    }
    if (!numberOfGuests || Number(numberOfGuests) < 1) {
      return NextResponse.json(
        { error: "Expected guests must be at least 1." },
        { status: 400 },
      );
    }
    if (!budget) {
      return NextResponse.json(
        { error: "Please select a budget range." },
        { status: 400 },
      );
    }
    if (!specialRequests || specialRequests.length < 20) {
      return NextResponse.json(
        { error: "Please provide at least 20 characters in special requests." },
        { status: 400 },
      );
    }

    const submittedAt = new Date().toISOString();

    await sendMail({
      to: bookingReplyTo,
      replyTo: email,
      subject: `New booking request from ${name}`,
      html: `
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0a0a0a;margin:0;padding:24px 12px;font-family:Inter,Poppins,Segoe UI,Arial,sans-serif;color:#ffffff;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;background:#111111;border:1px solid #2a2a2a;border-radius:20px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;background:linear-gradient(135deg,#171717 0%,#111111 45%,#2a1110 100%);border-bottom:1px solid #2a2a2a;">
                    <p style="margin:0;color:#f44336;font-size:12px;letter-spacing:1.6px;text-transform:uppercase;font-weight:700;">DJ Blaqmix</p>
                    <h1 style="margin:8px 0 0;font-size:26px;line-height:1.2;font-weight:700;color:#ffffff;">New Booking Request</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 16px;color:#d1d5db;font-size:14px;line-height:1.6;">
                      A new booking request was submitted through the website.
                    </p>

                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#151515;border:1px solid #303030;border-radius:14px;">
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Name</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(name)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(email)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(phone)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Event Date & Time</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(eventDate)} at ${escapeHtml(eventTime)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Event Type</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(eventType)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Venue</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(venue)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Expected Guests</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(numberOfGuests)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Budget</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(budget)}</p></td></tr>
                      <tr><td style="padding:12px 14px;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Submitted At</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(submittedAt)}</p></td></tr>
                    </table>

                    <div style="margin-top:16px;background:#151515;border:1px solid #303030;border-radius:14px;padding:14px;">
                      <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Special Requests</p>
                      <p style="margin:0;color:#e5e7eb;font-size:14px;line-height:1.7;">${escapeHtml(specialRequests).replaceAll("\n", "<br/>")}</p>
                    </div>

                    <div style="margin-top:20px;text-align:center;">
                      <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#f44336;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;line-height:1;padding:12px 20px;border-radius:12px;">Reply to ${escapeHtml(name)}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 24px;background:#0f0f0f;border-top:1px solid #2a2a2a;">
                    <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;letter-spacing:1px;text-transform:uppercase;">DJ Blaqmix Channels</p>
                    <p style="margin:0;font-size:13px;line-height:1.8;">
                      <a href="https://www.instagram.com/djblaqmix" style="color:#fca5a5;text-decoration:none;">Instagram</a>
                      <span style="color:#4b5563;"> • </span>
                      <a href="https://youtube.com/@djblaqmix" style="color:#fca5a5;text-decoration:none;">YouTube</a>
                      <span style="color:#4b5563;"> • </span>
                      <a href="https://www.tiktok.com/@djblaqmix" style="color:#fca5a5;text-decoration:none;">TikTok</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
    });

    await sendMail({
      to: email,
      subject: "Booking request received - DJ Blaqmix",
      html: `
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0a0a0a;margin:0;padding:24px 12px;font-family:Inter,Poppins,Segoe UI,Arial,sans-serif;color:#ffffff;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#111111;border:1px solid #2a2a2a;border-radius:20px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;background:linear-gradient(135deg,#171717 0%,#111111 45%,#2a1110 100%);border-bottom:1px solid #2a2a2a;">
                    <p style="margin:0;color:#f44336;font-size:12px;letter-spacing:1.6px;text-transform:uppercase;font-weight:700;">DJ Blaqmix</p>
                    <h1 style="margin:8px 0 0;font-size:24px;line-height:1.2;font-weight:700;color:#ffffff;">Booking Request Received</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 12px;color:#ffffff;font-size:16px;line-height:1.6;">Hello ${escapeHtml(name)},</p>
                    <p style="margin:0 0 14px;color:#d1d5db;font-size:14px;line-height:1.7;">
                      Your booking request is in. We will reach out shortly to confirm logistics and lock in your date.
                    </p>

                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#151515;border:1px solid #303030;border-radius:14px;">
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Event Date & Time</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(eventDate)} at ${escapeHtml(eventTime)}</p></td></tr>
                      <tr><td style="padding:12px 14px;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Event Type</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(eventType)}</p></td></tr>
                    </table>

                    <div style="margin-top:20px;text-align:center;">
                      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003"}" style="display:inline-block;background:#f44336;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;line-height:1;padding:12px 20px;border-radius:12px;">Visit DJ Blaqmix Website</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 24px;background:#0f0f0f;border-top:1px solid #2a2a2a;">
                    <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;letter-spacing:1px;text-transform:uppercase;">Follow DJ Blaqmix</p>
                    <p style="margin:0;font-size:13px;line-height:1.8;">
                      <a href="https://www.instagram.com/djblaqmix" style="color:#fca5a5;text-decoration:none;">Instagram</a>
                      <span style="color:#4b5563;"> • </span>
                      <a href="https://youtube.com/@djblaqmix" style="color:#fca5a5;text-decoration:none;">YouTube</a>
                      <span style="color:#4b5563;"> • </span>
                      <a href="https://www.tiktok.com/@djblaqmix" style="color:#fca5a5;text-decoration:none;">TikTok</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking submission error", error);
    return NextResponse.json(
      {
        error: "Unable to submit booking request right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
