"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";

const logosLink = [
  {
    id: 1,
    link: "/images/featured_events/club_vibe.png",
  },
  {
    id: 2,
    link: "/images/featured_events/club_phoenix.png",
  },
  {
    id: 3,
    link: "/images/featured_events/highlights_lounge.png",
  },
  {
    id: 4,
    link: "/images/blaqhouse.png",
  },
];

const infiniteSlides = [...logosLink, ...logosLink, ...logosLink, ...logosLink, ...logosLink]

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

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-10">
          <div className="flex items-center gap-x-4 w-full sm:w-auto justify-center sm:justify-start">
            <Link
              href="https://www.instagram.com/djblaqmix"
              target="_blank"
              className="flex text-white items-center w-10 h-10 bg-gray-800 justify-center rounded-full hover:bg-white hover:text-black "
            >
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </Link>
            <Link
              href="https://www.instagram.com/djblaqmix"
              target="_blank"
              className="flex text-white items-center w-10 h-10 bg-gray-800 justify-center rounded-full hover:bg-white hover:text-black "
            >
              <FontAwesomeIcon icon={faYoutube} size="xl" />
            </Link>
            <Link
              href="https://www.instagram.com/djblaqmix"
              target="_blank"
              className="flex text-white items-center w-10 h-10 bg-gray-800 justify-center rounded-full hover:bg-white hover:text-black "
            >
              <FontAwesomeIcon icon={faTiktok} size="xl" />
            </Link>
          </div>

          <div className="w-full sm:flex-1 flex gap-x-8 text-base sm:text-lg font-body-inter font-medium justify-center sm:justify-end">
            <div className="flex flex-col items-start gap-y-2">
              <Link href="#about" className="hover:link-hovered mx-2">
                About
              </Link>
              <Link href="#blaqhouse" className="hover:link-hovered mx-2">
                BlaqHouse
              </Link>
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <Link href="#upcoming-events" className="hover:link-hovered mx-2">
                Upcoming Events
              </Link>
              <Link href="#contact" className="hover:link-hovered mx-2">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className=" flex flex-col lg:flex-row items-stretch w-full border-t border-b border-gray-600 my-4 ">
          <div className="relative overflow-x-hidden w-full lg:w-1/2 px-4 py-4 lg:border-r border-gray-600  ">
            <div className=" flex items-center slide-animation space-x-2 ">
              {infiniteSlides.map((logo, i) => (
                <div
                  className="bg-gray-400 size-16 sm:size-20 lg:size-[100px] rounded-full p-2 flex items-center justify-center shrink-0"
                  key={i}
                >
                  <Image src={logo.link} alt="logo" width={72} height={72} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-y-4 px-4 py-4">
            <p className=" font-body-inter font-semibold text-sm sm:text-[16px] ">
              Stay up to date with Blaqhouse -{" "}
              <span className=" font-light text-xs sm:text-sm ">
                The Sunday School Experience
              </span>
            </p>
            <div className="flex items-center gap-x-6 sm:gap-x-10 w-full ">
              <Link
                href="https://www.instagram.com/djblaqmix"
                target="_blank"
                className="flex text-white items-center w-10 h-10 bg-gray-800 justify-center rounded-full hover:bg-white hover:text-black "
              >
                <FontAwesomeIcon icon={faInstagram} size="xl" />
              </Link>
              <Link
                href="https://www.instagram.com/djblaqmix"
                target="_blank"
                className="flex text-white items-center w-10 h-10 bg-gray-800 justify-center rounded-full hover:bg-white hover:text-black "
              >
                <FontAwesomeIcon icon={faYoutube} size="xl" />
              </Link>
              <Link
                href="https://www.instagram.com/djblaqmix"
                target="_blank"
                className="flex text-white items-center w-10 h-10 bg-gray-800 justify-center rounded-full hover:bg-white hover:text-black "
              >
                <FontAwesomeIcon icon={faTiktok} size="xl" />
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
