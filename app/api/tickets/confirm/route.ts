import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/nodemailer/mailer";

export const runtime = "nodejs";

type TicketTierPayload = {
  name?: string;
  price?: string;
  benefits?: string[];
};

type BuyerPayload = {
  name?: string;
  email?: string;
  phone?: string;
};

type PaymentPayload = {
  tx_ref?: string;
  transaction_id?: number;
  status?: string;
  amount?: number;
  currency?: string;
  flw_ref?: string;
};

type TicketConfirmationPayload = {
  eventId?: string;
  eventTitle?: string;
  eventDate?: string;
  eventTime?: string;
  tier?: TicketTierPayload;
  buyer?: BuyerPayload;
  payment?: PaymentPayload;
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const parseAmount = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
};

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as TicketConfirmationPayload;
    const flutterwaveSecretKey =
      process.env.NODE_ENV === "production"
        ? process.env.FLUTTERWAVE_PROD_SECRET_KEY || ""
        : process.env.FLUTTERWAVE_TEST_SECRET_KEY || "";
    const ticketReplyTo =
      process.env.TICKET_REPLY_TO || process.env.BOOKING_REPLY_TO;

    if (!flutterwaveSecretKey) {
      return NextResponse.json(
        { error: "FLTWV SK is not configured." },
        { status: 500 },
      );
    }

    if (!ticketReplyTo) {
      return NextResponse.json(
        { error: "Ticket notification email is not configured." },
        { status: 500 },
      );
    }

    const buyerName = payload.buyer?.name?.trim() || "";
    const buyerEmail = payload.buyer?.email?.trim() || "";
    const buyerPhone = payload.buyer?.phone?.trim() || "";
    const eventTitle = payload.eventTitle?.trim() || "";
    const eventDate = payload.eventDate?.trim() || "";
    const eventTime = payload.eventTime?.trim() || "";
    const tierName = payload.tier?.name?.trim() || "";
    const tierPrice = payload.tier?.price?.trim() || "";
    const expectedAmount = parseAmount(tierPrice);
    const txRef = payload.payment?.tx_ref?.trim() || "";
    const transactionId = payload.payment?.transaction_id;

    if (!buyerName || buyerName.length < 2) {
      return NextResponse.json(
        { error: "Buyer name is required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(buyerEmail)) {
      return NextResponse.json(
        { error: "A valid buyer email is required." },
        { status: 400 },
      );
    }

    if (!buyerPhone || buyerPhone.length < 7) {
      return NextResponse.json(
        { error: "A valid buyer phone number is required." },
        { status: 400 },
      );
    }

    if (!eventTitle || !tierName || !tierPrice || !txRef || !transactionId) {
      return NextResponse.json(
        { error: "Ticket purchase details are incomplete." },
        { status: 400 },
      );
    }

    const verificationResponse = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${flutterwaveSecretKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const verificationPayload = (await verificationResponse
      .json()
      .catch(() => null)) as {
      status?: string;
      data?: {
        status?: string;
        tx_ref?: string;
        amount?: number;
        currency?: string;
        customer?: { email?: string };
        id?: string | number;
      };
    } | null;

    if (!verificationResponse.ok) {
      return NextResponse.json(
        { error: "Unable to verify payment with Flutterwave." },
        { status: verificationResponse.status || 502 },
      );
    }

    const verifiedTransaction = verificationPayload?.data;

    if (
      verificationResponse.status !== 200 ||
      verificationPayload?.status !== "success" ||
      verifiedTransaction?.status !== "successful"
    ) {
      return NextResponse.json(
        { error: "Payment verification failed." },
        { status: 400 },
      );
    }

    if (verifiedTransaction.tx_ref !== txRef) {
      return NextResponse.json(
        { error: "Transaction reference mismatch." },
        { status: 400 },
      );
    }

    if ((verifiedTransaction.amount ?? 0) < expectedAmount) {
      return NextResponse.json(
        { error: "Verified payment amount is lower than expected." },
        { status: 400 },
      );
    }

    if ((verifiedTransaction.currency || "NGN") !== "NGN") {
      return NextResponse.json(
        {
          error: "Verified payment currency does not match expected currency.",
        },
        { status: 400 },
      );
    }

    if (
      verifiedTransaction.customer?.email?.toLowerCase() !==
      buyerEmail.toLowerCase()
    ) {
      return NextResponse.json(
        { error: "Verified customer email does not match the purchase form." },
        { status: 400 },
      );
    }

    const submittedAt = new Date().toISOString();
    const ticketBenefits = payload.tier?.benefits?.filter(Boolean) ?? [];

    await sendMail({
      to: buyerEmail,
      subject: `Ticket confirmed for ${eventTitle} - DJ Blaqmix`,
      html: `
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0a0a0a;margin:0;padding:24px 12px;font-family:Inter,Poppins,Segoe UI,Arial,sans-serif;color:#ffffff;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;background:#111111;border:1px solid #2a2a2a;border-radius:20px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;background:linear-gradient(135deg,#171717 0%,#111111 45%,#2a1110 100%);border-bottom:1px solid #2a2a2a;">
                    <p style="margin:0;color:#f44336;font-size:12px;letter-spacing:1.6px;text-transform:uppercase;font-weight:700;">DJ Blaqmix</p>
                    <h1 style="margin:8px 0 0;font-size:26px;line-height:1.2;font-weight:700;color:#ffffff;">Ticket Purchase Confirmed</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 12px;color:#ffffff;font-size:16px;line-height:1.6;">Hello ${escapeHtml(buyerName)},</p>
                    <p style="margin:0 0 16px;color:#d1d5db;font-size:14px;line-height:1.7;">
                      Your ticket purchase has been confirmed successfully. Please keep this email for your records.
                    </p>

                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#151515;border:1px solid #303030;border-radius:14px;">
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Event</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(eventTitle)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Ticket Type</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(tierName)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Amount Paid</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(tierPrice)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Event Date</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(eventDate)}${eventTime ? ` at ${escapeHtml(eventTime)}` : ""}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Transaction Ref</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(txRef)}</p></td></tr>
                      <tr><td style="padding:12px 14px;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Confirmed At</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(submittedAt)}</p></td></tr>
                    </table>

                    ${
                      ticketBenefits.length
                        ? `<div style="margin-top:16px;background:#151515;border:1px solid #303030;border-radius:14px;padding:14px;">
                            <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Included</p>
                            <p style="margin:0;color:#e5e7eb;font-size:14px;line-height:1.7;">${ticketBenefits.map((benefit) => escapeHtml(benefit)).join(", ")}</p>
                          </div>`
                        : ""
                    }

                    <div style="margin-top:20px;text-align:center;">
                      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003"}" style="display:inline-block;background:#f44336;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;line-height:1;padding:12px 20px;border-radius:12px;">Visit DJ Blaqmix Website</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
    });

    await sendMail({
      to: ticketReplyTo,
      replyTo: buyerEmail,
      subject: `Ticket sold for ${eventTitle} - ${buyerName}`,
      html: `
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0a0a0a;margin:0;padding:24px 12px;font-family:Inter,Poppins,Segoe UI,Arial,sans-serif;color:#ffffff;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;background:#111111;border:1px solid #2a2a2a;border-radius:20px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;background:linear-gradient(135deg,#171717 0%,#111111 45%,#2a1110 100%);border-bottom:1px solid #2a2a2a;">
                    <p style="margin:0;color:#f44336;font-size:12px;letter-spacing:1.6px;text-transform:uppercase;font-weight:700;">DJ Blaqmix</p>
                    <h1 style="margin:8px 0 0;font-size:26px;line-height:1.2;font-weight:700;color:#ffffff;">New Ticket Purchase</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#151515;border:1px solid #303030;border-radius:14px;">
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Buyer</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(buyerName)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(buyerEmail)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(buyerPhone)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Event</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(eventTitle)}</p></td></tr>
                      <tr><td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Tier</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(tierName)} - ${escapeHtml(tierPrice)}</p></td></tr>
                      <tr><td style="padding:12px 14px;"><span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Flutterwave Ref</span><p style="margin:6px 0 0;font-size:15px;color:#ffffff;">${escapeHtml(payload.payment?.flw_ref?.trim() || txRef)}</p></td></tr>
                    </table>
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
    console.error("Ticket confirmation error", error);
    return NextResponse.json(
      { error: "Unable to confirm ticket purchase right now." },
      { status: 500 },
    );
  }
}
