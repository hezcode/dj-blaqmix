"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCheckCircle,
  faClock,
  faDollarSign,
  faEnvelope,
  faMapMarkerAlt,
  faMusic,
  faPaperPlane,
  faPhone,
  faUser,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const eventOptions = [
  { value: "", optionName: "Select event type" },
  { value: "wedding", optionName: "Wedding" },
  { value: "birthday", optionName: "Birthday Party" },
  { value: "corporate", optionName: "Corporate Event" },
  { value: "club", optionName: "Club Night" },
  { value: "festival", optionName: "Festival" },
  { value: "private", optionName: "Private Party" },
  { value: "other", optionName: "Other" },
];

const budgetOptions = [
  { value: "", optionName: "Select budget range" },
  { value: "under-500k", optionName: "Under ₦500,000" },
  { value: "500k-1m", optionName: "₦500,000 - ₦1,000,000" },
  { value: "1m-2m", optionName: "₦1,000,000 - ₦2,000,000" },
  { value: "2m-5m", optionName: "₦2,000,000 - ₦5,000,000" },
  { value: "over-5m", optionName: "Over ₦5,000,000" },
];

type BookingFormValues = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  venue: string;
  numberOfGuests: string;
  budget: string;
  specialRequests: string;
  company: string;
};

const MakeBookingPage = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      eventTime: "",
      eventType: "",
      venue: "",
      numberOfGuests: "",
      budget: "",
      specialRequests: "",
      company: "",
    },
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setCanSubmit(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const onSubmit = async (data: BookingFormValues) => {
    if (data.company?.trim()) return;

    if (!canSubmit) {
      toast.error("Please review your details and try again.");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1400));
      setShowSuccessModal(true);
      reset();
      setCanSubmit(false);
      window.setTimeout(() => setCanSubmit(true), 3000);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <section className="page-container booking-page-pad">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="font-clash-display h2-fluid font-bold">
              Book DJ Blaqmix
            </h1>
            <p className="text-base sm:text-lg text-gray-300 font-body-inter max-w-2xl mx-auto mt-3">
              Complete this booking request form and our team will reach out to
              confirm your date, logistics, and performance details.
            </p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/5 backdrop-blur-2xl border border-gray-600 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              {...register("company")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-field overflow-hidden">
                <label htmlFor="name" className="form-label">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  <span>Full Name *</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-input max-w-full"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name is too short" },
                  })}
                />
                {errors.name ? (
                  <p className="text-xs text-blaqmix-red">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="form-field overflow-hidden">
                <label htmlFor="email" className="form-label">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  <span>Email Address *</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input max-w-full"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email ? (
                  <p className="text-xs text-blaqmix-red">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="form-field">
                <label htmlFor="phone" className="form-label">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  <span>Phone Number *</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  placeholder="+234 800 000 0000"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+0-9()\-\s]{7,20}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                />
                {errors.phone ? (
                  <p className="text-xs text-blaqmix-red">
                    {errors.phone.message}
                  </p>
                ) : null}
              </div>

              <div className="form-field">
                <label htmlFor="eventType" className="form-label">
                  <FontAwesomeIcon icon={faMusic} className="mr-2" />
                  <span>Event Type *</span>
                </label>
                <select
                  id="eventType"
                  className="form-select"
                  {...register("eventType", {
                    validate: (value) =>
                      value !== "" || "Please select event type",
                  })}
                >
                  {eventOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.optionName}
                    </option>
                  ))}
                </select>
                {errors.eventType ? (
                  <p className="text-xs text-blaqmix-red">
                    {errors.eventType.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className=" w-[50%] form-field">
                <label htmlFor="eventDate" className="form-label">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  <span>Event Date *</span>
                </label>
                <input
                  id="eventDate"
                  type="date"
                  className="form-input"
                  min={today}
                  {...register("eventDate", {
                    required: "Event date is required",
                    validate: (value) =>
                      value >= today || "Event date cannot be in the past",
                  })}
                />
                {errors.eventDate ? (
                  <p className="text-xs text-blaqmix-red">
                    {errors.eventDate.message}
                  </p>
                ) : null}
              </div>

              <div className="form-field">
                <label htmlFor="eventTime" className="form-label">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  <span>Event Time *</span>
                </label>
                <input
                  id="eventTime"
                  type="time"
                  className=" w-[50%] form-input"
                  {...register("eventTime", {
                    required: "Event time is required",
                  })}
                />
                {errors.eventTime ? (
                  <p className="text-xs text-blaqmix-red">
                    {errors.eventTime.message}
                  </p>
                ) : null}
              </div>

              <div className="form-field">
                <label htmlFor="venue" className="form-label">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  <span>Venue / Location *</span>
                </label>
                <input
                  id="venue"
                  type="text"
                  className="form-input"
                  placeholder="Event venue address"
                  {...register("venue", {
                    required: "Venue/location is required",
                    minLength: {
                      value: 5,
                      message: "Please enter a clearer venue address",
                    },
                  })}
                />
                {errors.venue ? (
                  <p className="text-xs text-blaqmix-red">
                    {errors.venue.message}
                  </p>
                ) : null}
              </div>

              <div className="form-field">
                <label htmlFor="numberOfGuests" className="form-label">
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  <span>Expected Guests *</span>
                </label>
                <input
                  id="numberOfGuests"
                  type="number"
                  className="form-input"
                  placeholder="500"
                  {...register("numberOfGuests", {
                    required: "Expected guest count is required",
                    validate: (value) =>
                      Number(value) >= 1 || "Guests must be at least 1",
                  })}
                />
                {errors.numberOfGuests ? (
                  <p className="text-xs text-blaqmix-red">
                    {errors.numberOfGuests.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="budget" className="form-label">
                <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                <span>Budget Range *</span>
              </label>
              <select
                id="budget"
                className="form-select"
                {...register("budget", {
                  validate: (value) =>
                    value !== "" || "Please select budget range",
                })}
              >
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.optionName}
                  </option>
                ))}
              </select>
              {errors.budget ? (
                <p className="text-xs text-blaqmix-red">
                  {errors.budget.message}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="specialRequests" className="form-label">
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                <span>Special Requests / Notes *</span>
              </label>
              <textarea
                id="specialRequests"
                rows={5}
                className="form-input resize-none"
                placeholder="Tell us about your event flow, preferred sound direction, or important details..."
                {...register("specialRequests", {
                  required: "Please add booking notes",
                  minLength: {
                    value: 20,
                    message: "Please provide at least 20 characters",
                  },
                })}
              />
              {errors.specialRequests ? (
                <p className="text-xs text-blaqmix-red">
                  {errors.specialRequests.message}
                </p>
              ) : null}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-blaqmix-red text-white font-body-inter font-semibold text-base sm:text-lg px-8 py-4 rounded-2xl hover:bg-blaqmix-red/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span>Send Booking Request</span>
                  </>
                )}
              </button>

              <Link
                href="/#contact"
                className="w-full sm:w-auto text-center px-6 py-4 rounded-2xl border border-white/30 bg-white/5 font-body-inter font-semibold text-white hover:border-blaqmix-red hover:text-blaqmix-red transition-all duration-300"
              >
                Contact / Enquiry Instead
              </Link>
            </div>
          </form>
        </div>
      </section>

      {showSuccessModal ? (
        <div className="fixed inset-0 z-80 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
            aria-label="Close booking success modal"
          />
          <div className="relative w-full max-w-md rounded-3xl border border-gray-600 bg-neutral-950/90 backdrop-blur-2xl p-6 sm:p-7">
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-3 right-3 size-9 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <FontAwesomeIcon icon={faCheckCircle} />
              </span>
              <h2 className="font-clash-display text-2xl font-semibold">
                Request Sent
              </h2>
            </div>
            <p className="text-gray-300 font-body-inter">
              Your booking request has been received successfully. Our team will
              get back to you shortly with next steps.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full rounded-2xl bg-blaqmix-red px-5 py-3 font-body-inter font-semibold text-white hover:bg-blaqmix-red/90 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default MakeBookingPage;
