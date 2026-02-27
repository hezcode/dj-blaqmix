"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const BlaqHouseDetails = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const blaqhouseHeaderSplit = new SplitText("#blaqhouse-info h2", {
          type: "words",
        });
        const blaqhouseStorySplit = new SplitText("#blaqhouse-info p", {
          type: "chars",
        });

        gsap.set(blaqhouseStorySplit.chars, { opacity: 0 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#blaqhouse-details-content",
              start: "top center",
              end: "bottom-center",
            },
          })
          .from(".blaqhouse-logo", {
            opacity: 0,
            y: -100,
            scale: 0.88,
            ease: "power3.out",
            duration: 0.9,
          })
          .to(".blaqhouse-logo", {
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
          })
          .from(blaqhouseHeaderSplit.words, {
            opacity: 0,
            yPercent: 70,
            filter: "blur(6px)",
            ease: "power3.out",
            duration: 0.6,
            stagger: 0.04,
          })
          .to(blaqhouseStorySplit.chars, {
            opacity: 1,
            ease: "none",
            duration: 0.03,
            stagger: {
              each: 0.015,
              from: "start",
            },
          });

        return () => {
          blaqhouseHeaderSplit.revert();
          blaqhouseStorySplit.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );
  return (
    <section
      id="blaqhouse-details"
      ref={sectionRef}
      className="section-pad page-container  space-y-9"
    >
      <div
        id="blaqhouse-details-content"
        className="flex relative items-center justify-center "
      >
        <div className="blaqhouse-logo relative w-[220px] sm:w-[280px] lg:w-[350px] aspect-350/220 bg-transparent">
          <Image
            src="/images/blaqhouse.png"
            alt="blaqhouse_logo"
            fill
            className=" object-contain "
          />
        </div>
      </div>
      <div id="blaqhouse-info" className=" space-y-7  ">
        <h2 className=" text-center font-clash-display h2-fluid font-bold tracking-wide max-w-[32ch] mx-auto ">
          A monthly themed rave which has had a cultural impact with its “fun in
          the dark” concept.
        </h2>
        <p className=" text-center text-gray-300 font-body-inter text-base sm:text-lg lg:text-xl font-light leading-relaxed tracking-tight prose-max  ">
          <b>BLAQHOUSE</b> is a party series built on one powerful idea: Fun in
          the dark. It is the freedom that comes when the lights go low and the
          music takes control. BLAQHOUSE is the pioneer of the Sunday rave in
          the brown roof city with the tagline{" "}
          <b>
            <em>Sunday school experience</em>
          </b>
        </p>
      </div>
    </section>
  );
};

export default BlaqHouseDetails;
