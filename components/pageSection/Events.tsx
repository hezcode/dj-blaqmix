import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons/faSquareCaretLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const events = [
  {
    id: 1,
    link: "/images/upcoming_events/event-01.JPG",
  },
  {
    id: 2,
    link: "/images/upcoming_events/event-02.JPG",
  },
  {
    id: 3,
    link: "/images/upcoming_events/event-03.JPG",
  },
  {
    id: 4,
    link: "/images/upcoming_events/event-04.JPG",
  },
];

const Events = () => {
  return (
    <section className="events py-24 px-4 overflow-x-hidden max-w-[1200px] mx-auto ">
      <h2 className=" font-bold text-blaqmix-red font-clash-display text-center text-[32px] ">
        Upcoming Events
      </h2>
      <div className=" overflow-x-scroll hide-scroll ">
        <div className=" mt-8 flex items-center gap-x-4 ">
          {events.map((event) => (
            <div
              key={event.id}
              className=" relative  p-2 w-fit hover:bg-white/5 backdrop-blur-2xl "
            >
              <div className=" relative w-[280px] h-[350px]  ">
                <Image
                  src={event.link}
                  fill
                  className=" object-cover  "
                  alt="event-image"
                />
              </div>
              <div className=" absolute w-[90%] h-[90%] bottom-0 right-0 border-b-2 border-r-2 " />
            </div>
          ))}
        </div>
      </div>
      <div className=" flex items-center justify-end gap-x-4 mt-7 ">
        <div className=" hover:caret-hover w-[50px] h-[50px] border flex items-center justify-center rounded-full ">
          <FontAwesomeIcon icon={faCaretLeft} size="xl" />
        </div>
        <div className=" hover:caret-hover w-[50px] h-[50px] border flex items-center justify-center rounded-full ">
          <FontAwesomeIcon icon={faCaretRight} size="xl" />
        </div>
      </div>
    </section>
  );
};

export default Events;
