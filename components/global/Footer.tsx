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

const Footer = () => {
  return (
    <footer className="relative  h-[70vh] overflow-hidden justify-between   text-center text-sm font-body-inter flex flex-col  p-8 ">
      <div className="absolute left-0 right-0 -bottom-20 -z-10  ">
        <div className=" w-full relative  h-[300px]  ">
          <Image
            src="/images/blaqmix_logo_white.png"
            alt="Blaqmix_logo"
            fill
            className="opacity-10 object-cover object-top "
          />

          <div className=" absolute w-full h-full top-0 left-0 bg-linear-to-t from-black to-transparent " />
        </div>
      </div>
      <div className=" space-y-4 ">
        <h2 className="text-center font-clash-display text-4xl w-[85%] mx-auto font-bold leading-snug tracking-wide ">
          DJ Blaqmix
        </h2>
        <p className="text-center text-gray-300 font-body-inter text-lg font-medium leading-relaxed tracking-tight w-[70%] max-w-[800px] mx-auto">
          While he maintains a growing fanbase, DJ Blaqmix continues to expand
          his craft, and he is emerging as one of the notable voices in
          Nigeria&rsquo;s new wave DJ scene
        </p>
      </div>
      <div className="flex items-start mt-10 ">
        <div className="flex items-center gap-x-4 w-[50%] ">
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
        <div className="w-[50%] flex gap-x-8 text-lg font-body-inter font-medium justify-end">
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
      <div className=" flex items-center w-full border-t border-b border-gray-600 my-12   ">
        <div className="relative  overflow-x-hidden  w-[50%] px-4 py-4 border-r border-gray-600 ">
          <div className=" flex items-center justify-between slide-animation ">
            {logosLink.map((logo) => (
              <div
                className="bg-gray-400 h-[100px] w-[100px] rounded-full p-2 flex items-center justify-center"
                key={logo.id}
              >
                <Image src={logo.link} alt="logo" width={72} height={72} />
              </div>
            ))}
          </div>
        </div>
        <div className="  h-full w-[50%] flex flex-col items-start justify-center gap-y-4 px-4">
          <p className=" font-body-inter font-semibold text-[16px] ">
            Stay up to date with Blaqhouse -{" "}
            <span className=" font-light text-sm ">
              The Sunday School Experience
            </span>
          </p>
          <div className="flex items-center gap-x-10 w-full ">
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
      <div className=" flex items-center justify-between ">
        <div className=" flex my-4 gap-x-2 items-center ">
          <p className=" font-body-inter ">Powered by: </p>
          <Image
            src="/images/enovate_logo.png"
            alt="enovate-studio-logo"
            width={96}
            height={96}
          />
          <p className="text-lg font-body-inter font-medium ">
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
        <p className=" text-sx ">© 2024 Blaqmix. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
