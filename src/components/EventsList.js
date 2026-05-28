"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import EventsForm from "@/app/events/forms/EventsForm";
import styles from "./EventsList.module.css";
import { getEvents } from "@/app/events/actions";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function EventsList({ events: initialEvents }) {
  const [events, setEvents] = useState(initialEvents);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [closing, setClosing] = useState(false);

  const refreshEvents = async () => {
    setLoading(true);
    const currentEvents = await getEvents();
    setEvents(currentEvents);
    setLoading(false);
  };

  const handleSuccess = async () => {
    await refreshEvents();
    setShowForm(false);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowForm(false);
      setClosing(false);
    }, 300);
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)} className={styles.addButton}>
        <PlusCircleIcon className={styles.addIcon} />
        Добавить событие
      </button>

      {showForm && (
        <div
          className={`${styles.modalOverlay} ${closing ? styles.closing : ""}`}
        >
          <div
            className={`${styles.modalContent} ${closing ? styles.closing : ""}`}
          >
            <button onClick={handleClose} className={styles.closeBtn}>
              <XMarkIcon className={styles.closeIcon} />
            </button>
            <h2>Добавить событие</h2>
            <EventsForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}

      {loading && <p>Обновляем список событий…</p>}

      <div className={styles.eventsGrid}>
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
