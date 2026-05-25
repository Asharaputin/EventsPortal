import { getAllEvents } from "@/lib/api";
import EventsList from "@/app/components/EventsList";

export default async function EventsPage() {
  const events = await getAllEvents();

  if (!events || events.length === 0) {
    return <h1>Событий пока нет</h1>;
  }

  return <EventsList events={events} />;
}
