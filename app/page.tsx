import type { Metadata } from "next";
import About from "@/components/pageSection/About";
import BlaqHouse from "@/components/pageSection/BlaqHouse";
import BlaqHouseDetails from "@/components/pageSection/BlaqHouseDetails";
import Contact from "@/components/pageSection/Contact";
import Events from "@/components/pageSection/Events";
import Footer from "@/components/global/Footer";
import IntroSection from "@/components/pageSection/IntroSection";
import ScrollRevealCover from "@/components/pageSection/ScrollRevealCover";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Experience DJ Blaqmix: premium mixes, live sets, upcoming events, and direct contact for enquiries.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DJ Blaqmix | Home",
    description:
      "Explore DJ Blaqmix live sets, event highlights, and enquiry options.",
    url: "/",
    images: [
      {
        url: "/images/blaqmix_sitting.png",
        width: 1200,
        height: 630,
        alt: "DJ Blaqmix Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Blaqmix | Home",
    description:
      "Explore DJ Blaqmix live sets, event highlights, and enquiry options.",
    images: ["/images/blaqmix_sitting.png"],
  },
};

export default function Home() {
  return (
    <main className="overflow-x-hidden">
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
