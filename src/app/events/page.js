import { getEvents } from "@/app/events/actions";
import EventsList from "@/components/EventsList";

export default async function EventsPage() {
  const events = await getEvents();

  if (!events || events.length === 0) {
    return <h1>Событий пока нет</h1>;
  }

  return <EventsList events={events} />;
}
