"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("prefers-reduced-motion: reduce", () => {})

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headerSplit = new SplitText(".about-header", {
          type: "words",
        });
        const paragraphSplit = new SplitText(".about-paragraphs p", {
          type: "chars",
        });

        // Set initial state for typing effect - hide all characters
        gsap.set(paragraphSplit.chars, {
          opacity: 0,
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#about-content",
              start: "top center",
            },
          })
          .from(headerSplit.words, {
            yPercent: 50,
            opacity: 0,
            ease: "expo.out",
            duration: 1.2,
            stagger: 0.04,
          })
          .to(paragraphSplit.chars, {
            opacity: 1,
            duration: 2,
            stagger: {
              amount: 2,
              from: "start",
            },
            ease: "none",
          });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#about",
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          })
          .to(".about-left-light", {
            y: -140,
            x: -140,
            duration: 1.5,
            ease: "back.out",
          })
          .to(".about-bottom-light", {
            x: -180,
            duration: 1.5,
            ease: "back.out",
          });

        return () => {
          headerSplit.revert();
          paragraphSplit.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );
  return (
    <section ref={sectionRef} id="about" className="relative overflow-x-hidden">
      <div id="about-content" className="page-container-wide section-pad min-h-dvh flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-16">
        <div className="w-full lg:w-1/2  ">
          <h3 className=" text-lg text-blaqmix-red font-medium font-poppins mb-9 ">
            THE STORY BEHIND THE SOUND
          </h3>
          <div className="relative w-full   ">
            <div className=" flex flex-col gap-y-8  z-20 ">
              <p className="about-header font-clash-display font-bold text-2xl sm:text-3xl lg:text-[32px] leading-relaxed tracking-wide">
                DJ Blaqmix, also known as The Dimple DJ, is a Nigerian disc
                jockey and music producer.
              </p>
              <div className=" about-paragraphs font-body-inter font-normal text-base sm:text-lg  space-y-4  text-gray-300 ">
                <p className=" leading-relaxed sm:leading-loose tracking-widest prose-max ">
                  With a sound rooted in contemporary African rhythms, DJ
                  Blaqmix has built a strong digital presence through mixtapes
                  on various digital platforms.
                </p>
                <p className=" leading-relaxed sm:leading-loose tracking-widest prose-max">
                  Recognized for his seamless transitions and party centric
                  selections, he has been able to curate a party series called{" "}
                  <span className=" font-clash-display font-extrabold text-2xl tracking-wider ">
                    BLAQ HOUSE.
                  </span>{" "}
                  A monthly themed rave which has had a cultural impact with its
                  “fun in the dark” concept.
                </p>
                {/* <p className="  ">
                  While he maintains a growing fanbase, DJ Blaqmix continues to
                  expand his craft, and he is emerging as one of the notable
                  voices in Nigeria’s new wave DJ scene.
                </p> */}
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full max-w-[520px] relative aspect-square inset-shadow-sm ">
          <Image
            src="/images/dj-blaqmix.jpeg"
            alt="Dj-Blaqmix"
            fill
            className="object-cover object-center rounded-3xl inset-shadow-sm z-20 "
          />
          <div className=" about-left-light absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] rounded-full bg-blaqmix-red/30 -z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 blur-3xl opacity-15 " />
        </div>
      </div>
      <div className=" absolute w-[170px] h-[170px] rounded-full bg-gray-400 -z-10 top-12 left-0 right-0 blur-2xl opacity-15 " />
      <div className=" about-bottom-light absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] rounded-full bg-gray-300 -z-10 bottom-24 -right-1/3 blur-3xl opacity-15 " />
    </section>
  );
};

export default About;
