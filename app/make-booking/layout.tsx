import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make Booking",
  description:
    "Send a booking request to DJ Blaqmix for weddings, corporate events, festivals, private parties, and more.",
  alternates: {
    canonical: "/make-booking",
  },
  openGraph: {
    title: "Book DJ Blaqmix",
    description:
      "Request your event date and book DJ Blaqmix for a premium performance experience.",
    url: "/make-booking",
    images: [
      {
        url: "/images/blaqmix_standing.jpg",
        width: 1200,
        height: 630,
        alt: "Book DJ Blaqmix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book DJ Blaqmix",
    description:
      "Request your event date and book DJ Blaqmix for a premium performance experience.",
    images: ["/images/blaqmix_standing.jpg"],
  },
};

export default function MakeBookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
