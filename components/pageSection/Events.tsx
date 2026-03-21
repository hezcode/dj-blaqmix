import EventsCarousel from "@/components/pageSection/EventsCarousel";
import { getUpcomingEvents } from "@/lib/sanity/events";

const Events = async () => {
  const events = await getUpcomingEvents();

  return (
    <section
      id="upcoming-events"
      className="events section-pad page-container overflow-x-hidden"
    >
      <h2 className=" font-bold text-blaqmix-red font-clash-display text-center text-2xl sm:text-3xl lg:text-[32px] ">
        Upcoming Events
      </h2>
      <EventsCarousel events={events} />
    </section>
  );
};

export default Events;
