import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { getAllEvents } from "@/lib/api";
import EventsList from "@/app/components/EventsList";

export default async function EventsPage() {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/signin");
  }

  const events = await getAllEvents();

  if (!events || events.length === 0) {
    return <h1>Событий пока нет</h1>;
  }

  return <EventsList events={events} />;
}
