"use client";

import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EventItem } from "@/types/event";
import EventCard from "../UI/EventCard";

interface EventsCarouselProps {
  events: EventItem[];
}

const EventsCarousel = ({ events }: EventsCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const hasEvents = events.length > 0;

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
  }, [events.length]);

  if (!hasEvents) {
    return (
      <div className="mt-10 rounded-3xl border border-gray-700 bg-white/5 p-8 text-center">
        <p className="text-lg font-poppins text-white">
          No upcoming events yet.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          New events will appear here as soon as they are available.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={scrollRef}
        className="overflow-x-auto hide-scroll events-scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        <div
          ref={trackRef}
          className="mt-8 flex items-stretch gap-x-4 sm:gap-x-6 xl:gap-x-12 w-max pr-2 pb-2"
        >
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
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
