"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

const BlaqHouseDetails = () => {
  useGSAP(() => {
    const blaqhouseHeaderSplit = new SplitText("#blaqhouse-info h2", {
      type: "words",
    });
    const blaqhouseStorySplit = new SplitText("#blaqhouse-info p", {
      type: "chars",
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#blaqhouse-details",
          start: "top center",
          end: "bottom-center",
        },
      })
      .from(".blaqhouse-logo", {
        opacity: 0,
        y: 400,
        ease: "bounce.inOut",
        duration: 0.6,
      })
      .from(blaqhouseHeaderSplit.words, {
        opacity: 0,
        yPercent: 100,
        ease: "power3.in",
        duration: 0.5,
        stagger: 0.02,
      })
      .from(blaqhouseStorySplit.chars, {
        opacity: 0,
        yPercent: 100,
        ease: "expo.inOut",
        duration: 0.5,
      });
  });
  return (
    <section
      id="blaqhouse-details"
      className=" py-24 px-4 space-y-9 max-w-[1200px] mx-auto "
    >
      <div className="flex relative items-center justify-center ">
        <div className="blaqhouse-logo w-[350px] h-[220px] bg-transparent ">
          <Image
            src="/images/blaqhouse.png"
            alt="blaqhouse_logo"
            fill
            className=" object-contain "
          />
        </div>
      </div>
      <div id="blaqhouse-info" className=" space-y-7  ">
        <h2 className=" text-center font-clash-display text-4xl w-[85%] mx-auto font-bold leading-snug tracking-wide ">
          A monthly themed rave which has had a cultural impact with its “fun in
          the dark” concept.
        </h2>
        <p className=" text-center text-gray-300 font-body-inter text-xl font-light leading-relaxed tracking-tight w-[70%] mx-auto ">
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
