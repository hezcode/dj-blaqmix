export const eventType = {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    },
    {
      name: "eventDate",
      title: "Event Date",
      type: "date",
    },
    {
      name: "startTime",
      title: "Start Time",
      type: "string",
      description: "Example: 9:00 PM",
    },
    {
      name: "venueName",
      title: "Venue Name",
      type: "string",
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Concert", value: "concert" },
          { title: "Club", value: "club" },
          { title: "Private Party", value: "private-party" },
          { title: "Festival", value: "festival" },
          { title: "Corporate", value: "corporate" },
          { title: "Wedding", value: "wedding" },
        ],
      },
    },
    {
      name: "priceLabel",
      title: "Price Label",
      type: "string",
      description: "Example: Free, ₦10,000, Early Bird ₦5,000",
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "upcoming",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Sold Out", value: "sold-out" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    },
    {
      name: "ticketUrl",
      title: "Ticket URL",
      type: "url",
    },
    {
      name: "isFeatured",
      title: "Featured Event",
      type: "boolean",
      initialValue: false,
    },
  ],
};
