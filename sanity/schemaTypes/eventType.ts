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
      name: "pricingTiers",
      title: "Pricing Tiers",
      type: "array",
      description:
        "Add each access level shown on the event card, including its price and included items.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Tier Name",
              type: "string",
              validation: (Rule: { required: () => unknown }) =>
                Rule.required(),
            },
            {
              name: "price",
              title: "Price",
              type: "string",
              description: "Example: 100,000 or ₦100,000",
              validation: (Rule: { required: () => unknown }) =>
                Rule.required(),
            },
            {
              name: "benefits",
              title: "Benefits",
              type: "array",
              of: [{ type: "string" }],
              description:
                "Add each included item separately. They will be displayed as one line on the event card.",
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "price",
            },
            prepare({
              title,
              subtitle,
            }: {
              title?: string;
              subtitle?: string;
            }) {
              return {
                title: title || "Pricing tier",
                subtitle: subtitle || "No price set",
              };
            },
          },
        },
      ],
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
