"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ScrollRevealCover = () => {
  const coverRef = useRef<HTMLDivElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

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

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyTouchAction = body.style.touchAction;

    if (showLoadingOverlay) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
    };
  }, [showLoadingOverlay]);

  useEffect(() => {
    const onScroll = () => {
      const threshold = Math.max(120, window.innerHeight * 0.25);
      setShowScrollHint(window.scrollY < threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!showLoadingOverlay) return;

    const progressTimer = window.setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 92) return prev;
        return prev + (prev < 60 ? 6 : 2);
      });
    }, 120);

    const onWindowLoaded = () => {
      setLoadProgress(100);
      window.setTimeout(() => setShowLoadingOverlay(false), 380);
    };

    if (document.readyState === "complete") {
      onWindowLoaded();
    } else {
      window.addEventListener("load", onWindowLoaded, { once: true });
    }

    return () => {
      window.clearInterval(progressTimer);
      window.removeEventListener("load", onWindowLoaded);
    };
  }, [showLoadingOverlay]);

  const loadingStatus =
    loadProgress < 80
      ? "Warming up the decks. One moment."
      : "Syncing the frequencies";

  return (
    <div ref={coverRef} className="min-h-dvh relative w-full overflow-hidden">
      <Image
        src="/images/hero_bg_blaqmix.png"
        alt="blaqmix-logo"
        fill
        priority
        sizes="100vw"
        onLoad={() => setHeroReady(true)}
        className={`masked-img size-full object-cover object-center bg-amber-50 transition-opacity duration-700 ${
          heroReady ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`fixed bottom-5 right-4 z-30 transition-all duration-400 ${
          showScrollHint
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
      >
        <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl px-4 py-2.5 flex items-center gap-2">
          <span className="text-xs sm:text-sm font-poppins tracking-wide text-white/90">
            Scroll down
          </span>
          <span className="inline-block animate-bounce text-blaqmix-red text-base leading-none">
            ↓
          </span>
        </div>
      </div>

      <div
        className={`absolute inset-0 z-40 flex items-center justify-center bg-black/70 transition-opacity duration-500 ${
          showLoadingOverlay ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-[min(460px,88vw)] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl px-5 py-5 sm:px-6 sm:py-6">
          <p className="font-poppins text-sm sm:text-base text-white mb-3">
            {loadingStatus}
          </p>
          <div className="h-0.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-blaqmix-red transition-all duration-300"
              style={{ width: `${Math.min(loadProgress, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-300">
            {Math.round(loadProgress)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollRevealCover;
