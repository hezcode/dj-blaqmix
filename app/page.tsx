import About from "@/components/pageSection/About";
import IntroSection from "@/components/pageSection/IntroSection";
import ScrollRevealCover from "@/components/pageSection/ScrollRevealCover";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" ">
      <ScrollRevealCover />
      <IntroSection />
      <About />
      <section id="events" className=" h-screen w-full border-yellow-600 ">
        Featured Events
      </section>
    </main>
  );
}
