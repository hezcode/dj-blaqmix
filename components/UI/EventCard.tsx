"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { EventItem } from "@/types/event";

interface EventCardProps {
  event: EventItem;
}

const formatDateParts = (dateString: string) => {
  const date = new Date(dateString);

  return {
    weekday: new Intl.DateTimeFormat("en-NG", { weekday: "short" })
      .format(date)
      .toUpperCase(),
    day: new Intl.DateTimeFormat("en-NG", { day: "2-digit" }).format(date),
  };
};

const formatTimeLabel = (startTime?: string) => {
  if (!startTime) return "TIME TBA";
  return startTime
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase()
    .replace(/\s*-\s*/g, " - ");
};

const statusStyles: Record<string, string> = {
  neutral: "bg-gray-600 text-white border-gray-700",
  upcoming: "bg-emerald-600 text-white border-emerald-700",
  "sold-out": "bg-amber-600 text-white border-amber-700",
  cancelled: "bg-red-600 text-white border-red-700",
  soldout: "bg-amber-600 text-white border-amber-700",
};

const EventCard = ({ event }: EventCardProps) => {
  const dateParts = formatDateParts(event.eventDate);
  const timeLabel = formatTimeLabel(event.startTime);
  const statusLabel =
    event.status === "sold-out"
      ? "Sold Out"
      : event.status === "cancelled"
        ? "Cancelled"
        : "Upcoming";

  return (
    <article
      data-event-card
      className="snap-start w-[340px] sm:w-[680px] xl:w-[780px]"
    >
      <div className="grid min-h-[740px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b0c] shadow-[0_20px_80px_rgba(0,0,0,0.28)] sm:min-h-[480px] sm:grid-cols-[minmax(0,1.65fr)_minmax(240px,0.95fr)]">
        <div className="relative flex min-h-[520px] flex-col justify-between overflow-hidden px-5 py-5 sm:min-h-80 sm:px-7 sm:py-7">
          <div className="pointer-events-none absolute inset-0 opacity-90">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_32%),linear-gradient(195deg,#0b0b0c_4%,#101014_30%,#16161b_68%,#0b0b0c_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(244,67,54,0.16),transparent_24%),radial-gradient(circle_at_80%_88%,rgba(255,255,255,0.08),transparent_20%)]" />
            <div className="absolute inset-0 opacity-[0.12] mix-blend-screen bg-[radial-gradient(rgba(255,255,255,0.8)_0.7px,transparent_0.7px)] bg-size-[4px_4px]" />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div
              className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${
                statusStyles[event.status ?? "neutral"]
              }`}
            >
              {statusLabel} Event
            </div>

            {(event.venueName || event.city) && (
              <p className="min-w-[50px] hidden sm:block sm:min-w-[120px] text-right font-poppins text-[11px] uppercase tracking-[0.22em] text-white/45 sm:text-xs">
                {[event.venueName, event.city].filter(Boolean).join(",")}
              </p>
            )}
          </div>

          <div className="relative z-10 mt-5 pr-2 sm:mt-4">
            <h3 className="max-w-[7ch] font-clash-display text-[2rem] leading-[0.84] font-semibold tracking-[-0.03em] text-white sm:text-[3.25rem]">
              {event.title}
            </h3>
            {event.shortDescription ? (
              <p className="mt-2.5 max-w-[32ch] text-sm leading-6 text-white/65 sm:text-[15px]">
                {event.shortDescription}
              </p>
            ) : null}
            {event.pricingTiers?.length ? (
              <div className="mt-4 max-w-lg space-y-3 border-t border-white/10 pt-4">
                {event.pricingTiers.map((tier) => (
                  <div key={tier._key ?? `${tier.name}-${tier.price}`}>
                    <p className="font-poppins text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white sm:text-[0.88rem]">
                      {tier.name} - {tier.price}
                    </p>
                    {tier.benefits?.length ? (
                      <p className="mt-1 text-[13px] leading-5 text-white/60 sm:text-sm">
                        {tier.benefits.join(", ")}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative z-10 mt-10 flex flex-row items-end justify-between gap-5 sm:mt-0">
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-blaqmix-red shadow-[0_0_16px_rgba(244,67,54,0.9)]" />
              <p className="font-poppins text-[0.875rem] font-semibold uppercase leading-none tracking-[-0.05em] text-[#ff5c57] sm:text-[1rem]">
                {event.eventType || "PRIVATE-PARTY"}
              </p>
            </div>

            <div className="text-right">
              <p className="font-poppins text-[1rem] font-semibold uppercase leading-[0.95] tracking-[-0.05em] text-white">
                {dateParts.weekday} {dateParts.day}
              </p>
              <p className="mt-1 font-poppins text-[1.8rem] font-semibold uppercase leading-[0.95] tracking-[-0.05em] text-white">
                {timeLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="group relative min-h-[220px] border-t border-white/10 sm:min-h-full sm:border-t-0 sm:border-l sm:border-white/10">
          {event.coverImage ? (
            <Image
              src={urlFor(event.coverImage).width(900).height(1200).url()}
              alt={event.title}
              fill
              className="object-cover object-center transition-transform duration-500"
              sizes="(max-width: 640px) 320px, (max-width: 1280px) 280px, 300px"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45)_0,rgba(255,255,255,0.08)_18%,transparent_34%),radial-gradient(circle_at_top_center,transparent_0,transparent_28%,rgba(17,17,17,0.15)_29%,rgba(17,17,17,0.15)_30%,transparent_31%),radial-gradient(circle_at_center,transparent_0,transparent_28%,rgba(17,17,17,0.45)_29%,rgba(17,17,17,0.45)_30%,transparent_31%),linear-gradient(180deg,#f5ef9c_0%,#faf6cd_100%)]" />
          )}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_42%),linear-gradient(180deg,rgba(255,250,213,0.16),rgba(8,8,8,0.04))]" />
          <div className="absolute inset-[4%] rounded-[20px] border border-black/10" />
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(rgba(15,15,15,0.8)_0.8px,transparent_0.8px)] bg-size-[4px_4px]" />

          <div className="absolute bottom-0 left-0 right-0 z-30 bg-linear-to-t from-black via-black/84 to-transparent px-5 pb-5 pt-16 text-right sm:px-6 sm:pb-6" />
        </div>
      </div>
    </article>
  );
};

export default EventCard;
