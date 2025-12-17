"use client";
import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ScrollRevealCover = () => {
  const coverRef = useRef(null);
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: coverRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      })
      .to(".masked-img", {
        maskSize: "15000%",
        scale: 1.3,
        duration: 1.5,
      });
  });

  return (
    <div
      ref={coverRef}
      className={` h-screen relative  w-full overflow-hidden `}
    >
      <Image
        src="/images/hero_bg_blaqmix.png"
        alt="blaqmix-logo"
        width={400}
        height={200}
        className="abs-center masked-img size-full object-cover bg-amber-50 "
      />
    </div>
  );
};

export default ScrollRevealCover;
