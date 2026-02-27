"use client";
import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ScrollRevealCover = () => {
  const coverRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { reduceMotion, isMobile } = context.conditions as {
            reduceMotion: boolean;
            isMobile: boolean;
          };

          if (reduceMotion) return;
          const imageEl = coverRef.current?.querySelector(
            ".masked-img",
          ) as HTMLElement | null;
          if (!imageEl) return;

          gsap.set(imageEl, {
            scale: 1,
            maskSize: "50%",
            webkitMaskSize: "50%",
            transformOrigin: "center center",
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: coverRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .to(imageEl, {
              maskSize: isMobile ? "8000%" : "15000%",
              webkitMaskSize: isMobile ? "8000%" : "15000%",
              scale: 1.3,
              duration: 1.8,
            });
        },
      );

      return () => mm.revert();
    },
    { scope: coverRef },
  );

  return (
    <div ref={coverRef} className="min-h-dvh relative w-full overflow-hidden">
      <Image
        src="/images/hero_bg_blaqmix.png"
        alt="blaqmix-logo"
        fill
        priority
        sizes="100vw"
        className="masked-img size-full object-cover object-center bg-amber-50"
      />
    </div>
  );
};

export default ScrollRevealCover;
