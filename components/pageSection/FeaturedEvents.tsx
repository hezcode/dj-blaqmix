import { div } from "motion/react-client";
import Image from "next/image";
import React from "react";

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
];

const FeaturedEvents = () => {
  return (
    <section className=" py-12 ">
      <div className="relative overflow-x-hidden gap-x-6 w-[50%] mx-auto horizontal-shadow-inside   px-4 py-4 rounded-full  ">
        <div className=" flex items-center justify-between slide-animation ">
          {logosLink.map((logo) => (
            <div className="bg-gray-400 rounded-full p-2 " key={logo.id}>
              <Image src={logo.link} alt="logo" width={72} height={72} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
