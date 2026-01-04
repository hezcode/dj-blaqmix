"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "../UI/CustomButton";
import { faCalendarAlt, faPlay } from "@fortawesome/free-solid-svg-icons";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, SplitText);

const IntroSection = () => {
  useGSAP(() => {
    const introTitleSplit = new SplitText(".title", { type: "words, chars" });

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
        y: 100,
        duration: 0.8,
        ease: "back.inOut",
      })
      .from(introTitleSplit.words, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        stagger: 0.04,
        ease: "expo.out",
      })
      .from(".btn-container button", {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.04,
        ease: "expo.out",
      });

    //   timeline for light glow
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#intro",
          start: "top bottom",
          scrub: true,
          end: "bottom top",
        },
      })
      .from(".left-light", { scale: 0.3, duration: 1 }, 0)
      .from(".right-light", { scale: 0.2, duration: 1 }, 0);
  });

  return (
    <section className="relative overflow-x-hidden ">
      <div
        className="content py-24 px-4 max-w-[1240px] mx-auto h-screen "
        id="intro"
      >
        <div className="relative flex flex-col justify-center w-full h-full">
          <h3 className="subtitle text-2xl font-medium font-poppins mb-4 text-gray-300">
            {" "}
            From afrobeat to amapiano — the vibe is always premium.{" "}
          </h3>
          <h1 className="title font-clash-display text-8xl font-extrabold leading-tight ">
            {" "}
            No Long talk. <br /> Just Vibes.{" "}
          </h1>
          <div className="btn-container flex items-center gap-x-6 mt-12 ">
            <CustomButton
              text="Book me for your next Event"
              Icon={<FontAwesomeIcon icon={faCalendarAlt} />}
              className=" bg-white text-black text-lg font-semibold rounded-2xl "
            />
            <CustomButton
              text="Listen to my latest mix"
              Icon={<FontAwesomeIcon icon={faPlay} />}
              className=" bg-transparent rounded-2xl border border-blaqmix-red text-blaqmix-red text-lg font-semibold "
            />
          </div>
        </div>
      </div>
      <div className=" left-light absolute w-[450px] h-[450px] rounded-full bg-gray-400 -z-10 top-0 -left-4 blur-2xl opacity-15 " />
      <div className=" right-light absolute w-[350px] h-[350px] rounded-full bg-gray-400 -z-10 bottom-24 -right-24 blur-3xl opacity-15 " />
    </section>
  );
};

export default IntroSection;
