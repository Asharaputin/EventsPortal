import { getEventById } from "../actions";
import EventDetail from "@/components/EventDetail";

export default async function EventDetailPage({ params }) {
  const paramsObject = await params;

  const event = await getEventById(paramsObject.id);

  if (!event) {
    return <h1>Событие не найдено</h1>;
  }

  return <EventDetail event={event} />;
}
