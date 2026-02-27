"use client";

import {
  faCalendarDays,
  faCaretLeft,
  faCaretRight,
  faClock,
  faLocationDot,
  faTag,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { urlFor } from "@/lib/sanity.image";
import type { EventItem } from "@/types/event";

interface EventsCarouselProps {
  events: EventItem[];
}

const formatDate = (dateString: string) =>
  new Intl.DateTimeFormat("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));

const statusStyles: Record<string, string> = {
  upcoming: "bg-emerald-600 text-white border-emerald-700",
  "sold-out": "bg-amber-600 text-white border-amber-700",
  cancelled: "bg-red-600 text-white border-red-700",
};

const EventsCarousel = ({ events }: EventsCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const hasEvents = events.length > 0;

  const normalizedEvents = useMemo(
    () =>
      events.map((event) => ({
        ...event,
        dateLabel: formatDate(event.eventDate),
        statusLabel:
          event.status === "sold-out"
            ? "Sold Out"
            : event.status === "cancelled"
              ? "Cancelled"
              : "Upcoming",
      })),
    [events],
  );

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const first = track.querySelector<HTMLElement>("[data-event-card]");
    const gap = window.innerWidth >= 640 ? 24 : 16;
    const amount = first ? first.offsetWidth + gap : 320;
    const delta = direction === "left" ? -amount : amount;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const updateOverflow = () => {
      const el = scrollRef.current;
      if (!el) return;
      setHasOverflow(el.scrollWidth > el.clientWidth + 1);
    };

    updateOverflow();
    window.addEventListener("resize", updateOverflow);

    const timeout = window.setTimeout(updateOverflow, 300);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("resize", updateOverflow);
    };
  }, [normalizedEvents.length]);

  if (!hasEvents) {
    return (
      <div className="mt-10 rounded-3xl border border-gray-700 bg-white/5 p-8 text-center">
        <p className="text-lg font-poppins text-white">
          No upcoming events yet.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          New events will appear here as soon as they are published from the
          CMS.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={scrollRef}
        className="overflow-x-auto hide-scroll snap-x snap-mandatory scroll-smooth"
      >
        <div
          ref={trackRef}
          className="mt-8 flex items-stretch gap-x-4 sm:gap-x-6 w-max pr-2 pb-2"
        >
          {normalizedEvents.map((event) => (
            <article
              key={event._id}
              data-event-card
              className="snap-start w-[300px] sm:w-[340px] lg:w-[360px] rounded-3xl border border-white/15 bg-neutral-900/70 backdrop-blur-2xl overflow-hidden"
            >
              <div className="relative h-[240px] sm:h-[260px] w-full bg-black overflow-hidden">
                {event.coverImage ? (
                  <Image
                    src={urlFor(event.coverImage).width(720).height(480).url()}
                    alt={event.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 360px"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-neutral-800 to-neutral-900" />
                )}
                <div className="absolute inset-0 bg-gray-900/20" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {event.eventType ? (
                    <span className="text-xs font-semibold uppercase tracking-wide rounded-full border border-white/25 bg-black/60 px-3 py-1">
                      {event.eventType}
                    </span>
                  ) : null}
                  <span
                    className={`text-xs font-semibold rounded-full border px-3 py-1 ${
                      statusStyles[event.status ?? "upcoming"] ??
                      statusStyles.upcoming
                    }`}
                  >
                    {event.statusLabel}
                  </span>
                </div>
                {event.priceLabel ? (
                  <span className="absolute bottom-4 right-4 text-xs font-semibold rounded-full bg-white text-black px-3 py-1">
                    {event.priceLabel}
                  </span>
                ) : null}
              </div>

              <div className="p-5 sm:p-6 flex flex-col gap-4">
                <div>
                  <h3 className="font-clash-display text-xl sm:text-2xl font-semibold leading-tight">
                    {event.title}
                  </h3>
                  {event.shortDescription ? (
                    <p className="mt-2 text-sm text-gray-300">
                      {event.shortDescription}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2 text-sm text-gray-200">
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-blaqmix-red"
                    />
                    <span>{event.dateLabel}</span>
                  </p>
                  {event.startTime ? (
                    <p className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-blaqmix-red"
                      />
                      <span>{event.startTime}</span>
                    </p>
                  ) : null}
                  {(event.venueName || event.city) && (
                    <p className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-blaqmix-red"
                      />
                      <span>
                        {[event.venueName, event.city]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </p>
                  )}
                  {event.priceLabel ? (
                    <p className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faTag}
                        className="text-blaqmix-red"
                      />
                      <span>{event.priceLabel}</span>
                    </p>
                  ) : null}
                </div>

                <div className="pt-1">
                  {event.ticketUrl ? (
                    <Link
                      href={event.ticketUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
                    >
                      <FontAwesomeIcon icon={faTicket} />
                      Get Ticket
                    </Link>
                  ) : (
                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                    >
                      <FontAwesomeIcon icon={faTicket} />
                      Request Invite
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {hasOverflow ? (
        <div className="flex items-center justify-end gap-x-4 mt-7">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hover:caret-hover w-10 h-10 lg:w-[50px] lg:h-[50px] border flex items-center justify-center rounded-full transition-all duration-300"
            aria-label="Scroll events left"
          >
            <FontAwesomeIcon icon={faCaretLeft} size="xl" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="hover:caret-hover w-10 h-10 lg:w-[50px] lg:h-[50px] border flex items-center justify-center rounded-full transition-all duration-300"
            aria-label="Scroll events right"
          >
            <FontAwesomeIcon icon={faCaretRight} size="xl" />
          </button>
        </div>
      ) : null}
    </>
  );
};

export default EventsCarousel;
