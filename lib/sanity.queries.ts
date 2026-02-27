export const UPCOMING_EVENTS_QUERY = `*[
  _type == "event" &&
  defined(eventDate) &&
  eventDate >= string(now())
] | order(isFeatured desc, eventDate asc, startTime asc){
  _id,
  title,
  "slug": slug.current,
  coverImage,
  eventDate,
  startTime,
  venueName,
  city,
  eventType,
  priceLabel,
  status,
  ticketUrl,
  shortDescription,
  isFeatured
}`;
