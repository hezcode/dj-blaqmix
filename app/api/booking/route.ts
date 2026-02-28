import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
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
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Event Date:</strong> ${escapeHtml(eventDate)}</p>
        <p><strong>Event Time:</strong> ${escapeHtml(eventTime)}</p>
        <p><strong>Event Type:</strong> ${escapeHtml(eventType)}</p>
        <p><strong>Venue:</strong> ${escapeHtml(venue)}</p>
        <p><strong>Expected Guests:</strong> ${escapeHtml(numberOfGuests)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
        <p><strong>Special Requests:</strong><br/>${escapeHtml(specialRequests).replaceAll("\n", "<br/>")}</p>
        <p><strong>Submitted At:</strong> ${escapeHtml(submittedAt)}</p>
      `,
    });

    await sendMail({
      to: email,
      subject: "Booking request received - DJ Blaqmix",
      html: `
        <h2>Booking Request Received</h2>
        <p>Hello ${escapeHtml(name)},</p>
        <p>Thanks for your booking request. We will reach out shortly to confirm your event details.</p>
        <p><strong>Date:</strong> ${escapeHtml(eventDate)} at ${escapeHtml(eventTime)}</p>
        <p><strong>Event Type:</strong> ${escapeHtml(eventType)}</p>
        <p>Regards,<br/>DJ Blaqmix Team</p>
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
