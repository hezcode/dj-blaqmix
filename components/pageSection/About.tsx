"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  useGSAP(() => {
    const headerSplit = new SplitText(".about-header", {
      type: "words",
    });
    const paragraphSplit = new SplitText(".about-paragraphs p", {
      type: "lines",
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top center",
        },
      })
      .from(headerSplit.words, {
        yPercent: 100,
        opacity: 0,
        ease: "expo.out",
        duration: 0.5,
        stagger: 0.04,
      })
      .from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 100,
        ease: "power2.out",
        duration: 0.8,
        stagger: 0.01,
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
      .to(".left-light", {
        y: -140,
        x: -140,
        duration: 1.5,
        ease: "back.out",
      })
      .to(".bottom-light", {
        x: -180,
        duration: 1.5,
        ease: "back.out",
      });
  });
  return (
    <section id="about" className="relative overflow-x-hidden ">
      <div className=" h-dvh w-full max-w-[1600px] mx-auto px-4 md:px-6 py-24 flex justify-between items-center  ">
        <div className="w-[45%]">
          <h3 className=" text-lg text-blaqmix-red font-medium font-poppins mb-9 ">
            THE STORY BEHIND THE SOUND
          </h3>
          <div className="relative w-full   ">
            <div className=" flex flex-col gap-y-8   z-20 ">
              <p className="about-header font-clash-display font-bold text-[32px] leading-snug tracking-wide  ">
                DJ Blaqmix, also known as The Dimple DJ, is a Nigerian disc
                jockey and music producer.
              </p>
              <div className=" about-paragraphs font-body-inter font-normal text-lg flex flex-col gap-y-4 mx-7 text-gray-300 ">
                <p className="  ">
                  With a sound rooted in contemporary African rhythms, DJ
                  Blaqmix has built a strong digital presence through mixtapes
                  on various digital platforms.
                </p>
                <p className="  ">
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
        <div className=" w-[450px] h-[450px] relative inset-shadow-sm ">
          <Image
            src="/images/dj-blaqmix.jpeg"
            alt="Dj-Blaqmix"
            fill
            className="object-cover object-center rounded-3xl inset-shadow-sm z-20 "
          />
          <div className=" left-light absolute w-[400px] h-[400px] rounded-full bg-blaqmix-red/30 -z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 blur-3xl opacity-15 " />
        </div>
      </div>
      <div className=" absolute w-[170px] h-[170px] rounded-full bg-gray-400 -z-10 top-12 left-0 right-0 blur-2xl opacity-15 " />
      <div className=" bottom-light absolute w-[400px] h-[400px] rounded-full bg-gray-300 -z-10 bottom-24 -right-1/3 blur-3xl opacity-15 " />
    </section>
  );
};

export default About;
