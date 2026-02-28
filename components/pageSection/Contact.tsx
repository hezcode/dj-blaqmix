"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faEnvelope,
  faHeadset,
  faPaperPlane,
  faPhone,
  faQuestionCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, SplitText);

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
  company: string;
};

const enquiryOptions = [
  { value: "", optionName: "Select enquiry type" },
  { value: "general-info", optionName: "General Information" },
  { value: "availability", optionName: "Availability" },
  { value: "partnership", optionName: "Partnership / Collaboration" },
  { value: "media", optionName: "Media / Press" },
  { value: "other", optionName: "Other" },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      enquiryType: "",
      message: "",
      company: "",
    },
  });

  useEffect(() => {
    setStartedAt(Date.now());
    const timer = window.setTimeout(() => setCanSubmit(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {});

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headerSplit = new SplitText(".contact-header", {
          type: "words",
        });
        const subtitleSplit = new SplitText(".contact-subtitle", {
          type: "words",
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#contact-content",
              start: "top center",
            },
          })
          .from(headerSplit.words, {
            yPercent: 50,
            opacity: 0,
            ease: "expo.out",
            duration: 1.2,
            stagger: 0.04,
          })
          .from(
            subtitleSplit.words,
            {
              opacity: 0,
              y: 20,
              ease: "power2.out",
              duration: 0.8,
              stagger: 0.02,
            },
            "-=0.5",
          )
          .from(
            ".form-field",
            {
              opacity: 0,
              y: 30,
              ease: "power2.out",
              duration: 0.6,
              stagger: 0.05,
            },
            "-=0.3",
          );

        return () => {
          headerSplit.revert();
          subtitleSplit.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const onSubmit = async (data: ContactFormValues) => {
    if (data.company?.trim()) return;

    if (!canSubmit) {
      toast.error("Please review your details and try again.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          startedAt,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || "Unable to submit enquiry.");
      }

      toast.success("Enquiry sent successfully. We will respond shortly.");
      reset();
      setCanSubmit(false);
      setStartedAt(Date.now());
      window.setTimeout(() => setCanSubmit(true), 2500);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-x-hidden"
    >
      <div id="contact-content" className="page-container section-pad">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="contact-header font-clash-display font-bold h2-fluid mb-4">
            Contact DJ Blaqmix
          </h3>
          <p className="contact-subtitle text-base sm:text-lg text-gray-300 font-body-inter max-w-2xl mx-auto">
            Need information, collaboration details, or have an enquiry? Send a
            message below. For event bookings, please use the dedicated booking
            page.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="form-field rounded-2xl border border-gray-600 bg-white/5 backdrop-blur-2xl p-4">
            <div className="flex items-center gap-2 text-blaqmix-red">
              <FontAwesomeIcon icon={faHeadset} />
              <span className="font-semibold font-poppins text-sm">
                Support
              </span>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              For quick questions and event information.
            </p>
          </div>
          <div className="form-field rounded-2xl border border-gray-600 bg-white/5 backdrop-blur-2xl p-4">
            <div className="flex items-center gap-2 text-blaqmix-red">
              <FontAwesomeIcon icon={faCircleInfo} />
              <span className="font-semibold font-poppins text-sm">
                Enquiries
              </span>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Partnerships, media, and collaboration opportunities.
            </p>
          </div>
          <div className="form-field rounded-2xl border border-gray-600 bg-white/5 backdrop-blur-2xl p-4">
            <div className="flex items-center gap-2 text-blaqmix-red">
              <FontAwesomeIcon icon={faQuestionCircle} />
              <span className="font-semibold font-poppins text-sm">
                Bookings
              </span>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Ready to book? Go to the booking page for full event details.
            </p>
          </div>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          suppressHydrationWarning
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl border border-gray-600 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6"
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            suppressHydrationWarning
            className="hidden"
            {...register("company")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label htmlFor="name" className="form-label">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <span>Full Name *</span>
              </label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="John Doe"
                autoComplete="name"
                suppressHydrationWarning
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

            <div className="form-field">
              <label htmlFor="email" className="form-label">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <span>Email Address *</span>
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="john@example.com"
                autoComplete="email"
                suppressHydrationWarning
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
                autoComplete="tel"
                suppressHydrationWarning
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
              <label htmlFor="enquiryType" className="form-label">
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                <span>Enquiry Type *</span>
              </label>
              <select
                id="enquiryType"
                className="form-select"
                suppressHydrationWarning
                {...register("enquiryType", {
                  validate: (value) =>
                    value !== "" || "Please select an enquiry type",
                })}
              >
                {enquiryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.optionName}
                  </option>
                ))}
              </select>
              {errors.enquiryType ? (
                <p className="text-xs text-blaqmix-red">
                  {errors.enquiryType.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="message" className="form-label">
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
              <span>Message *</span>
            </label>
            <textarea
              id="message"
              rows={5}
              className="form-input resize-none"
              placeholder="Tell us how we can help you..."
              autoComplete="off"
              suppressHydrationWarning
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 20,
                  message: "Please provide more details (min 20 characters)",
                },
              })}
            />
            {errors.message ? (
              <p className="text-xs text-blaqmix-red">
                {errors.message.message}
              </p>
            ) : null}
          </div>

          <div className="form-field pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-x-3 bg-blaqmix-red text-white font-body-inter font-semibold text-base sm:text-lg px-8 py-4 rounded-2xl hover:bg-blaqmix-red/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} />
                  <span>Send Enquiry</span>
                </>
              )}
            </button>

            <Link
              href="/make-booking"
              className="w-full sm:w-auto text-center px-6 py-4 rounded-2xl border border-white/30 bg-white/5 font-body-inter font-semibold text-white hover:border-blaqmix-red hover:text-blaqmix-red transition-all duration-300"
            >
              Go to Booking Page
            </Link>
          </div>
        </form>
      </div>

      <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-blaqmix-red/20 -z-10 top-20 -left-20 blur-3xl opacity-15" />
      <div className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full bg-gray-400 -z-10 bottom-20 -right-20 blur-3xl opacity-15" />
    </section>
  );
};

export default Contact;
