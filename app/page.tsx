import About from "@/components/pageSection/About";
import BlaqHouse from "@/components/pageSection/BlaqHouse";
import BlaqHouseDetails from "@/components/pageSection/BlaqHouseDetails";
import Events from "@/components/pageSection/Events";
import FeaturedEvents from "@/components/pageSection/FeaturedEvents";
import Footer from "@/components/global/Footer";
import IntroSection from "@/components/pageSection/IntroSection";
import ScrollRevealCover from "@/components/pageSection/ScrollRevealCover";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" ">
      <ScrollRevealCover />
      <IntroSection />
      <About />
      {/* <FeaturedEvents /> */}
      <BlaqHouse />
      <BlaqHouseDetails />
      <Events />
      <Footer />
    </main>
  );
}
