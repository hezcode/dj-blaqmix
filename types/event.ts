export type EventStatus = "upcoming" | "sold-out" | "cancelled";

export interface EventPricingTier {
  _key?: string;
  name: string;
  price: string;
  benefits?: string[];
}

export interface EventItem {
  _id: string;
  title: string;
  slug?: string;
  coverImage?: unknown;
  eventDate: string;
  startTime?: string;
  venueName?: string;
  city?: string;
  eventType?: string;
  priceLabel?: string;
  pricingTiers?: EventPricingTier[];
  status?: EventStatus;
  ticketUrl?: string;
  shortDescription?: string;
  isFeatured?: boolean;
}
