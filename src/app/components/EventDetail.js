"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import styles from "./EventDetail.module.css";
import { useNotification } from "../context/notification-context";
import EventsForm from "../events/EventsForm";
import ConfirmModal from "./ConfirmModal";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function EventDetail({ event }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const {
    data: freshEvent,
    mutate,
    error,
  } = useSWR(`/api/events/${event._id}`, fetcher, { fallbackData: event });

  if (error) return <p>Ошибка загрузки</p>;
  if (!freshEvent) return <p>Загрузка...</p>;

  const { showNotification } = useNotification();

  const onDelete = async () => {
    const res = await fetch(`/api/events/${freshEvent._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      showNotification("Событие удалено", "success");
      router.replace("/events");
    } else {
      showNotification("Ошибка при удалении", "error");
    }
    setShowConfirm(false);
  };

  if (!freshEvent) {
    return (
      <div className={styles.notFoundPage}>
        <h2>Событие не найдено</h2>
        <p>Похоже, указан неверный идентификатор или событие было удалено.</p>
        <button
          onClick={() => router.push("/events")}
          className={styles.backBtn}
        >
          ⬅ Вернуться к списку событий
        </button>
      </div>
    );
  }

  return (
    <div className={styles.eventDetail}>
      <h1>{freshEvent.title}</h1>
      {freshEvent.image && (
        <Image
          src={freshEvent.image}
          alt={freshEvent.title}
          width={600}
          height={400}
          priority
          loading="eager"
          className="eventImage"
        />
      )}
      <p>{freshEvent.description}</p>
      <p>
        <strong>Город:</strong> {freshEvent.city}
      </p>
      <p>
        <strong>Дата:</strong> {freshEvent.date}
      </p>

      <div className={styles.buttonGroup}>
        <button onClick={() => setShowForm(true)} className={styles.editButton}>
          ✏️ Редактировать
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className={styles.deleteButton}
        >
          🗑️ Удалить
        </button>
      </div>

      {showConfirm && (
        <ConfirmModal
          message="Удалить событие?"
          onConfirm={onDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              onClick={() => setShowForm(false)}
              className={styles.closeBtn}
            >
              ✖
            </button>
            <h2>Редактировать событие</h2>
            <EventsForm
              event={freshEvent}
              onSuccess={async () => {
                await mutate();
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
