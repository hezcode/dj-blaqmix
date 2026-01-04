"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const BlaqHouse = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.preload = "metadata";
    video.load();
  }, []);
  useGSAP(() => {
    const videoTl = gsap.timeline({
      scrollTrigger: {
        pin: true,
        trigger: containerRef.current,
        scrub: true,
        start: "top top",
      },
    });

    videoRef.current!.onloadedmetadata = () => {
      videoTl.to(videoRef.current, {
        currentTime: videoRef.current!.duration,
        ease: "none",
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen overflow-hidden">
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
