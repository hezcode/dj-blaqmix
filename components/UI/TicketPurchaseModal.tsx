"use client";

import {
  faEnvelope,
  faPhone,
  faTicket,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import toast from "react-hot-toast";
import CustomButton from "@/components/UI/CustomButton";
import CustomInput from "@/components/UI/CustomInput";
import type { EventItem, EventPricingTier } from "@/types/event";

interface TicketPurchaseModalProps {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_TIERS: EventPricingTier[] = [];

type TicketFormState = {
  selectedTier: string;
  name: string;
  email: string;
  phone: string;
};

const parseTierAmount = (price: string) => {
  const sanitized = price.replace(/[^0-9.]/g, "");
  const amount = Number(sanitized);
  return Number.isFinite(amount) ? amount : 0;
};

const formatEventDate = (dateString: string) =>
  new Intl.DateTimeFormat("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const TicketPurchaseModal = ({
  event,
  isOpen,
  onClose,
}: TicketPurchaseModalProps) => {
  const tiers = event.pricingTiers ?? EMPTY_TIERS;
  const [form, setForm] = useState<TicketFormState>({
    selectedTier: tiers[0]?._key ?? "",
    name: "",
    email: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedTier = useMemo(
    () =>
      tiers.find((tier) => tier._key === form.selectedTier) ?? tiers[0] ?? null,
    [form.selectedTier, tiers],
  );

  const publicKey =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_FLUTTERWAVE_TEST_PUBLIC_KEY || ""
      : process.env.NEXT_PUBLIC_FLUTTERWAVE_PROD_PUBLIC_KEY || "";

  const selectedAmount = selectedTier ? parseTierAmount(selectedTier.price) : 0;
  const txRef = `ticket-${event.title}-${Date.now()}-${form.email.trim().toLowerCase()}`;

  const config = {
    public_key: publicKey,
    tx_ref: txRef,
    amount: selectedAmount,
    currency: "NGN",
    payment_options: "card,banktransfer,ussd",
    customer: {
      email: form.email.trim(),
      phone_number: form.phone.trim(),
      name: form.name.trim(),
    },
    meta: {
      eventId: event._id,
      eventTitle: event.title,
      ticketTier: selectedTier?.name ?? "",
      ticketPrice: selectedTier?.price ?? "",
    },
    customizations: {
      title: `Reservation for ${event.title}`,
      description: `Purchase of ${selectedTier?.name ?? "event"} reservation`,
      logo: `${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/storage/v1/object/public/blaqmix/blaqmix_logo_black.png`,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const resetForm = () => {
    setForm({
      selectedTier: tiers[0]?._key ?? "",
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleClose = () => {
    if (isProcessing) return;
    onClose();
    resetForm();
  };

  const handleChange = (
    eventChange: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = eventChange.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () => {
    if (!selectedTier) {
      toast.error("Please select a reservation tier.");
      return false;
    }
    if (!form.name.trim() || form.name.trim().length < 2) {
      toast.error("Please enter your full name.");
      return false;
    }
    if (!isValidEmail(form.email.trim())) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!form.phone.trim() || form.phone.trim().length < 7) {
      toast.error("Please enter a valid phone number.");
      return false;
    }
    if (!selectedAmount) {
      toast.error("The selected reservation price is invalid.");
      return false;
    }
    if (!publicKey) {
      toast.error("FLTWV PB is not configured.");
      return false;
    }
    return true;
  };

  const handleProceedToPay = async (
    eventSubmit: FormEvent<HTMLFormElement>,
  ) => {
    eventSubmit.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      handleFlutterPayment({
        callback: async (response) => {
          try {
            if (response.status !== "completed") {
              throw new Error("Payment was not completed successfully.");
            }
            const confirmationResponse = await fetch("/api/tickets/confirm", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                eventId: event._id,
                eventTitle: event.title,
                eventDate: event.eventDate,
                eventTime: event.startTime,
                tier: selectedTier,
                buyer: {
                  name: form.name.trim(),
                  email: form.email.trim(),
                  phone: form.phone.trim(),
                },
                payment: {
                  tx_ref: response.tx_ref,
                  transaction_id: response.transaction_id,
                  status: response.status,
                  amount: response.amount,
                  currency: response.currency,
                  flw_ref: response.flw_ref,
                },
              }),
            });

            const payload = (await confirmationResponse
              .json()
              .catch(() => null)) as { error?: string } | null;

            if (!confirmationResponse.ok) {
              throw new Error(
                payload?.error ||
                  "Payment completed, but ticket confirmation failed.",
              );
            }

            toast.success(
              "Payment confirmed. Your ticket email is on the way.",
            );
            closePaymentModal();
            resetForm();
            onClose();
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : "Unable to confirm your ticket purchase.";
            toast.error(message);
            closePaymentModal();
          } finally {
            setIsProcessing(false);
          }
        },
        onClose: () => {
          setIsProcessing(false);
        },
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to start payment right now.";
      toast.error(message);
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={handleClose}
        aria-label="Close ticket purchase modal"
      />
      <div className="relative z-10 max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-[28px] border border-white/12 bg-[#0f0f10] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-7">
        <button
          type="button"
          onClick={handleClose}
          disabled={isProcessing}
          className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="pr-10">
          <p className="font-poppins text-xs font-semibold uppercase tracking-[0.24em] text-blaqmix-red">
            Reservation Checkout
          </p>
          <h3 className="mt-2 font-clash-display text-3xl font-semibold text-white">
            Make Reservation
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/65">
            Select your access tier for {event.title} on{" "}
            {formatEventDate(event.eventDate)}
            {event.startTime ? ` at ${event.startTime}` : ""}.
          </p>
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleProceedToPay}>
          <CustomInput
            id="selectedTier"
            name="selectedTier"
            label="Ticket Type"
            value={form.selectedTier}
            required
            onChange={handleChange}
            selectOptions={tiers.map((tier: EventPricingTier) => ({
              value: tier._key ?? "",
              optionName: `${tier.name} - ${tier.price}`,
            }))}
            icon={faTicket}
            disabled={isProcessing}
          />

          {selectedTier?.benefits?.length ? (
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
              <p className="font-poppins text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                Included
              </p>
              <p className="mt-2 text-sm leading-6 text-white/95">
                {selectedTier.benefits.join(", ")}
              </p>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CustomInput
              id="name"
              name="name"
              type="text"
              value={form.name}
              label="Full Name"
              required
              onChange={handleChange}
              placeholder="John Doe"
              icon={faUser}
              disabled={isProcessing}
            />
            <CustomInput
              id="email"
              name="email"
              type="email"
              value={form.email}
              label="Email Address"
              required
              onChange={handleChange}
              placeholder="you@example.com"
              icon={faEnvelope}
              disabled={isProcessing}
            />
          </div>

          <CustomInput
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            label="Phone Number"
            required
            onChange={handleChange}
            placeholder="08012345678"
            icon={faPhone}
            disabled={isProcessing}
          />

          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                Amount
              </p>
              <p className="mt-1 font-poppins text-2xl font-semibold text-white">
                {selectedTier?.price ?? "--"}
              </p>
            </div>
            <CustomButton
              type="submit"
              text={isProcessing ? "Processing..." : "Proceed to Pay"}
              disabled={isProcessing}
              className="justify-center rounded-2xl bg-blaqmix-red px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-blaqmix-red/90"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketPurchaseModal;
