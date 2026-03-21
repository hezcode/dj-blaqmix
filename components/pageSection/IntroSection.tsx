"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "../UI/CustomButton";
import { faCalendarAlt, faPlay } from "@fortawesome/free-solid-svg-icons";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger, SplitText);

const IntroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Respect reduced motion: skip intro animations.
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const introTitleSplit = new SplitText(".title", {
          type: "words, chars",
        });

        // timeline for texts
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#intro",
              start: "top center",
            },
          })
          .from(".subtitle", {
            opacity: 0,
            y: 80,
            duration: 0.8,
            ease: "back.inOut",
          })
          .from(introTitleSplit.words, {
            opacity: 0,
            yPercent: 100,
            duration: 1.2,
            stagger: 0.04,
            ease: "expo.out",
          })
          .from(".btn-container button", {
            opacity: 0,
            scale: 0.95,
            duration: 0.7,
            stagger: 0.02,
            ease: "expo.out",
          });

        // timeline for light glow
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#intro",
              start: "top bottom",
              scrub: true,
              end: "bottom top",
            },
          })
          .from(".hero-left-light", { scale: 0.3, duration: 1 }, 0)
          .from(".hero-right-light", { scale: 0.2, duration: 1 }, 0);

        return () => {
          introTitleSplit.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="hero" className="relative overflow-x-hidden">
      <div
        className="content page-container-wide section-pad min-h-dvh"
        id="intro"
      >
        <div className="relative flex flex-col justify-center w-full h-full">
          <h3 className="subtitle text-base sm:text-lg lg:text-2xl font-medium font-poppins mb-4 text-gray-300">
            From afrobeat to amapiano — the vibe is always premium.
          </h3>
          <h1 className="title font-clash-display h1-fluid font-extrabold tracking-tight">
            {" "}
            No Long talk. <br /> Just Vibes.{" "}
          </h1>
          <div className="btn-container flex flex-col sm:flex-row sm:items-center items-stretch gap-4 sm:gap-x-6 mt-10 sm:mt-12 max-w-xl">
            <CustomButton
              text="Book me for your next Event"
              Icon={<FontAwesomeIcon icon={faCalendarAlt} />}
              action="book"
              className=" bg-white text-black text-base sm:text-lg font-semibold rounded-2xl w-full sm:w-auto justify-center text-nowrap "
            />
            <CustomButton
              text="Listen to my latest mix"
              Icon={<FontAwesomeIcon icon={faPlay} />}
              className=" bg-transparent rounded-2xl border border-blaqmix-red text-blaqmix-red text-base sm:text-lg font-semibold w-full sm:w-auto justify-center text-nowrap "
            />
          </div>
        </div>
      </div>
      <div className=" hero-left-light absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[450px] lg:h-[450px] rounded-full bg-gray-400 -z-10 top-0 -left-4 blur-2xl opacity-15 " />
      <div className=" hero-right-light absolute w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px] rounded-full bg-gray-400 -z-10 bottom-24 -right-16 sm:-right-24 blur-3xl opacity-15 " />
    </section>
  );
};

export default IntroSection;
