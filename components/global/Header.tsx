"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [hasViewPortHeight, setHasViewPortHeight] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        const threshold = window.innerHeight;
        if (window.scrollY > threshold) {
          setHasViewPortHeight(true);
        } else {
          setHasViewPortHeight(false);
        }
      });
    }
    return () => window.removeEventListener("scroll", () => {});
  }, []);
  return (
    <>
      {hasViewPortHeight && (
        <section className="fixed max-w-[1240px] mx-auto right-0 left-0 md:top-4 z-40 px-4 ">
          {
            <nav className="  w-full rounded-2xl border border-gray-400 bg-white/10 backdrop-blur-2xl  px-4 py-2 flex items-center justify-between ">
              <div className=" relative w-[200px] h-15 ">
                <Image
                  src="/images/blaqmix_logo_black.png"
                  alt="Blaqmix_logo"
                  fill
                  className=""
                />
              </div>
              <ul className="flex gap-x-7 text-sm font-body-inter font-medium list-none max-sm:hidden text-white  ">
                <li className=" hover:link-hovered ">
                  <Link href="#hero">Home</Link>
                </li>
                <li className="hover:link-hovered ">
                  <Link href="#about">About</Link>
                </li>
                <li className="hover:link-hovered ">
                  <Link href="#blaqhouse">BlaqHouse</Link>
                </li>
                <li className="hover:link-hovered ">
                  <Link href="#upcoming-events">Upcoming Events</Link>
                </li>
              </ul>
              <div className=" p-4 bg-black rounded-t-2xl rounded-br-2xl font-body-inter font-semibold ">
                Book DJ now
              </div>
            </nav>
          }
        </section>
      )}
    </>
  );
};

export default Header;
