"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute left-0 right-0 -bottom-20 -z-10">
        <div className=" w-full relative h-[260px] sm:h-[300px] ">
          <Image
            src="/images/blaqmix_logo_white.png"
            alt="Blaqmix_logo"
            fill
            className="opacity-10 object-cover object-top "
          />

          <div className=" absolute w-full h-full top-0 left-0 bg-linear-to-t from-black to-transparent " />
        </div>
      </div>
      <div className="page-container section-pad-sm flex flex-col gap-10 text-sm font-body-inter">
        <div className=" space-y-4 ">
          <h2 className="text-center font-clash-display h2-fluid mx-auto font-bold tracking-wide ">
            DJ Blaqmix
          </h2>
          <p className="text-center text-gray-300 font-body-inter text-base sm:text-lg font-medium leading-relaxed tracking-tight prose-max">
            While he maintains a growing fanbase, DJ Blaqmix continues to expand
            his craft, and he is emerging as one of the notable voices in
            Nigeria&rsquo;s new wave DJ scene
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-white/5 backdrop-blur-2xl p-5 sm:p-6">
            <div className="relative h-12 sm:h-14 w-[180px] sm:w-[220px]">
              <Image
                src="/images/blaqmix_logo_white.png"
                alt="Blaqmix logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-300">
              Blaqmix is the main brand delivering premium DJ experiences across
              weddings, nightlife, and curated live events.
            </p>
            <p className="text-center mt-6 sm:text-left text-xs sm:text-sm text-gray-300 mb-5">
              Follow <span className="text-white font-semibold">Blaqmix</span>{" "}
              on socials to stay updated on mixes and releases.
            </p>

            <div className="flex items-center gap-x-4 w-full sm:w-auto justify-center sm:justify-start">
              <Link
                href="https://www.instagram.com/djblaqmix?igsh=MTVmZHlhbzRxMzMwYQ%3D%3D&utm_source=qr"
                target="_blank"
                className="flex text-white items-center w-10 h-10 bg-gray-800 justify-center rounded-full hover:bg-white hover:text-black "
              >
                <FontAwesomeIcon icon={faInstagram} size="xl" />
              </Link>
              <Link
                href="https://youtube.com/@djblaqmix?si=A6qntDCgrVBC0Nll"
                target="_blank"
                className="flex text-white items-center w-10 h-10 bg-gray-800 justify-center rounded-full hover:bg-white hover:text-black "
              >
                <FontAwesomeIcon icon={faYoutube} size="xl" />
              </Link>
              <Link
                href="https://www.tiktok.com/@djblaqmix?_r=1&_t=ZS-92i4n3xekbN"
                target="_blank"
                className="flex text-white items-center w-10 h-10 bg-gray-800 justify-center rounded-full hover:bg-white hover:text-black "
              >
                <FontAwesomeIcon icon={faTiktok} size="xl" />
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-white/5 backdrop-blur-2xl p-5 sm:p-6">
            <div className="relative h-12 sm:h-14 w-[180px] sm:w-[220px]">
              <Image
                src="/images/blaqhouse.png"
                alt="BlaqHouse logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-300">
              BlaqHouse is Blaqmix&rsquo;s monthly event series, built to create
              a bold, high-energy community vibe.
            </p>
            <p className="text-center mt-6 sm:text-left text-xs sm:text-sm text-gray-300 mb-5">
              Follow <span className="text-white font-semibold">BlaqHouse</span>{" "}
              on socials to stay updated on monthly experiences.
            </p>

            <div className="flex items-center gap-x-4 w-full sm:w-auto justify-center sm:justify-start">
              <Link
                href="https://www.instagram.com/blaqhousehq?igsh=MWh3cXJ3dWVyZ3Vwcw%3D%3D&utm_source=qr"
                target="_blank"
                className="flex text-white items-center w-10 h-10 bg-gray-800 justify-center rounded-full hover:bg-white hover:text-black "
              >
                <FontAwesomeIcon icon={faInstagram} size="xl" />
              </Link>
              <Link
                href="https://www.tiktok.com/@blaqhousehq?_r=1&_t=ZN-92i54RQPUyU"
                target="_blank"
                className="flex text-white items-center w-10 h-10 bg-gray-800 justify-center rounded-full hover:bg-white hover:text-black "
              >
                <FontAwesomeIcon icon={faTiktok} size="xl" />
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl px-5 py-5 sm:px-6 sm:py-6">
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 text-base sm:text-lg font-body-inter font-medium">
            <div className="flex flex-col items-start sm:items-start gap-y-2">
              <p className="text-xs mb-2 uppercase tracking-wider text-gray-400">
                Quick Links
              </p>
              <Link href="#about" className="hover:link-hovered">
                About
              </Link>
              <Link href="#blaqhouse" className="hover:link-hovered">
                BlaqHouse
              </Link>
              <Link href="#upcoming-events" className="hover:link-hovered">
                Upcoming Events
              </Link>
              <Link href="#contact" className="hover:link-hovered">
                Contact
              </Link>
            </div>
            <div className="flex flex-col items-start sm:items-start gap-y-2">
              <p className="text-xs mb-2 uppercase tracking-wider text-gray-400">
                Services
              </p>
              <span className="text-white/90">Weddings</span>
              <span className="text-white/90">Corporate Events</span>
              <span className="text-white/90">Private Parties</span>
              <span className="text-white/90">Club & Festival Sets</span>
            </div>
            <div className="flex flex-col items-start sm:items-start gap-y-2">
              <p className="text-xs mb-2 uppercase tracking-wider text-gray-400">
                Bookings & Enquiries
              </p>
              <Link href="/make-booking" className="hover:link-hovered">
                Make a Booking
              </Link>
              <Link href="#contact" className="hover:link-hovered">
                General Enquiries
              </Link>
            </div>
          </div>
        </div>

        <div className=" flex flex-col sm:flex-row items-center justify-between gap-4 ">
          <div className=" flex flex-wrap my-2 gap-x-2 items-center justify-center sm:justify-start ">
            <p className=" font-body-inter ">Powered by: </p>
            <Image
              src="/images/enovate_logo.png"
              alt="enovate-studio-logo"
              width={96}
              height={96}
            />
            <p className="text-base sm:text-lg font-body-inter font-medium ">
              |{" "}
              <Link
                className="hover:link-hovered "
                href="https://www.enovate.work"
                target="_blank"
              >
                Enovate Studio
              </Link>{" "}
            </p>
          </div>
          <p className=" text-xs ">© 2026 Blaqmix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
