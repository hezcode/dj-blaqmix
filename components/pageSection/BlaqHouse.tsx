"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const BlaqHouse = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const percentageRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.preload = "metadata";
    video.load();
  }, []);
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
          const { reduceMotion, isMobile, isDesktop } = context.conditions as {
            reduceMotion: boolean;
            isMobile: boolean;
            isDesktop: boolean;
          };

          const video = videoRef.current;
          const container = containerRef.current;
          if (!video || !container) return;

          if (reduceMotion) {
            video.pause();
            if (progressFillRef.current) progressFillRef.current.style.width = "0%";
            if (percentageRef.current) percentageRef.current.textContent = "0%";
            if (overlayRef.current) gsap.set(overlayRef.current, { autoAlpha: 1 });
            return;
          }

          if (isDesktop || isMobile) {
            video.pause();
            video.loop = false;
            if (overlayRef.current) gsap.set(overlayRef.current, { autoAlpha: 0 });

            const videoTl = gsap.timeline({
              scrollTrigger: {
                pin: true,
                trigger: container,
                scrub: true,
                start: "top top",
                end: "+=2000",
                onUpdate: (self) => {
                  const percent = Math.round(self.progress * 100);
                  if (progressFillRef.current) {
                    progressFillRef.current.style.width = `${percent}%`;
                  }
                  if (percentageRef.current) {
                    percentageRef.current.textContent = `${percent}%`;
                  }
                  if (overlayRef.current) {
                    let overlayOpacity = 1;

                    // Fade in at the beginning.
                    if (self.progress < 0.08) {
                      overlayOpacity = self.progress / 0.08;
                    }

                    // Fade out only once progress is fully complete (100%).
                    if (percent >= 100) {
                      overlayOpacity = 0;
                    }

                    gsap.to(overlayRef.current, {
                      autoAlpha: overlayOpacity,
                      duration: 0.2,
                      ease: "power1.out",
                      overwrite: true,
                    });
                  }
                },
              },
            });

            const onMeta = () => {
              videoTl.to(video, {
                currentTime: video.duration,
                ease: "none",
              });
              ScrollTrigger.refresh();
            };

            if (video.readyState >= 1) onMeta();
            else video.addEventListener("loadedmetadata", onMeta, { once: true });

            return () => {
              video.removeEventListener("loadedmetadata", onMeta);
            };
          }
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="blaqhouse"
      ref={containerRef}
      className="h-screen overflow-hidden relative"
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[min(84vw,380px)]"
      >
        <div className="rounded-2xl border border-white/25 bg-neutral-900/70 backdrop-blur-2xl px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex items-center justify-between text-xs sm:text-sm font-poppins text-white mb-2">
            <span className="uppercase tracking-widest">Blaqhouse Loading</span>
            <span ref={percentageRef}>0%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/30 overflow-hidden">
            <div
              ref={progressFillRef}
              className="h-full w-0 bg-blaqmix-red transition-[width] duration-150"
            />
          </div>
        </div>
      </div>
      <div className="flex size-full">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
          className="size-full object-cover "
        ></video>
      </div>
    </section>
  );
};

export default BlaqHouse;
