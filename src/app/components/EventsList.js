"use client";

import { useState } from "react";
import useSWR from "swr";
import EventCard from "./EventCard";
import EventsForm from "@/app/events/EventsForm"; // форма добавления события
import "./EventsList.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function EventsList({ events: initialEvents }) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const {
    data: events,
    error,
    mutate,
  } = useSWR("/api/events", fetcher, {
    fallbackData: initialEvents,
  });

  if (error) return <p>Ошибка загрузки</p>;
  if (!events) return <p>Загрузка...</p>;

  return (
    <div>
      <button onClick={() => setShowForm(true)} className="addButton">
        ➕ Добавить событие
      </button>

      {showForm && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button onClick={() => setShowForm(false)} className="closeBtn">
              ✖
            </button>
            <h2>Добавить событие</h2>
            <EventsForm
              onSuccess={async () => {
                setLoading(true);
                await mutate();
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}

      {loading && <p>Обновляем список событий…</p>}

      <div className="events-grid">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
