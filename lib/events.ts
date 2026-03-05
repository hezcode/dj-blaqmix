import { sanityClient, isSanityConfigured } from "@/lib/sanity.client";
import { UPCOMING_EVENTS_QUERY } from "@/lib/sanity.queries";
import type { EventItem } from "@/types/event";
import { unstable_cache } from "next/cache";

const fetchUpcomingEvents = async (): Promise<EventItem[]> => {
  if (!isSanityConfigured) return [];

  try {
    const events = await sanityClient.fetch<EventItem[]>(UPCOMING_EVENTS_QUERY);
    return events ?? [];
  } catch {
    return [];
  }
};

const getCachedUpcomingEvents = unstable_cache(
  fetchUpcomingEvents,
  ["upcoming-events"],
  {
    revalidate: 60,
    tags: ["events"],
  },
);

export const getUpcomingEvents = async (): Promise<EventItem[]> =>
  getCachedUpcomingEvents();
