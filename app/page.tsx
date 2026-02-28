import type { Metadata } from "next";
import About from "@/components/pageSection/About";
import BlaqHouse from "@/components/pageSection/BlaqHouse";
import BlaqHouseDetails from "@/components/pageSection/BlaqHouseDetails";
import Contact from "@/components/pageSection/Contact";
import Events from "@/components/pageSection/Events";
import Footer from "@/components/global/Footer";
import IntroSection from "@/components/pageSection/IntroSection";
import ScrollRevealCover from "@/components/pageSection/ScrollRevealCover";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

export const metadata: Metadata = {
  title: "DJ Blaqmix | The Dimple DJ",
  description:
    "Official DJ Blaqmix website. Book DJ Blaqmix for weddings, corporate events, private parties, nightlife, and BlaqHouse experiences.",
  keywords: [
    "DJ Blaqmix official website",
    "Book DJ Blaqmix",
    "The Dimple DJ",
    "BlaqHouse",
    "Event DJ Nigeria",
    "Lagos DJ booking",
    "DJ Blaqmix",
    "Blaqmix",
    "DJ in Nigeria",
    "Lagos DJ",
    "Wedding DJ",
    "Corporate event DJ",
    "Private party DJ",
    "Buy Blaqhouse tickets",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DJ Blaqmix | The Dimple DJ",
    description:
      "Book DJ Blaqmix for unforgettable events, premium sound, and crowd-moving sets.",
    url: "/",
    siteName: "DJ Blaqmix",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/blaqmix_standing.jpg",
        width: 1200,
        height: 630,
        alt: "DJ Blaqmix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Blaqmix | The Dimple DJ",
    description:
      "Book DJ Blaqmix for weddings, parties, nightlife, and premium live events.",
    images: ["/images/blaqmix_standing.jpg"],
  },
};

export default function Home() {
  const djJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "DJ Blaqmix",
    alternateName: ["Blaqmix", "The Dimple DJ"],
    url: siteUrl,
    image: `${siteUrl}/images/blaqmix_standing.jpg`,
    sameAs: [
      "https://www.instagram.com/djblaqmix?igsh=MTVmZHlhbzRxMzMwYQ%3D%3D&utm_source=qr",
      "https://youtube.com/@djblaqmix?si=A6qntDCgrVBC0Nll",
      "https://www.tiktok.com/@djblaqmix?_r=1&_t=ZS-92i4n3xekbN",
    ],
    jobTitle: "DJ",
    description:
      "Professional DJ available for weddings, corporate events, private parties, nightlife, and festivals.",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DJ Blaqmix",
    url: siteUrl,
    description:
      "Official website for DJ Blaqmix bookings, events, mixes, and enquiries.",
    inLanguage: "en",
  };

  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(djJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <ScrollRevealCover />
      <IntroSection />
      <About />
      <BlaqHouse />
      <BlaqHouseDetails />
      <Events />
      <Contact />
      <Footer />
    </main>
  );
}
