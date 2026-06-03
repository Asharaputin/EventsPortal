"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useNotification } from "../context/notification-context";
import EventsForm from "@/app/events/forms/EventsForm";
import ConfirmModal from "./ConfirmModal";
import { deleteEvent, getEventById } from "@/app/events/actions";

export default function EventDetail({ event }) {
  const [freshEvent, setFreshEvent] = useState(event);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  const refreshEvent = async () => {
    const updated = await getEventById(event._id);
    setFreshEvent(updated);
  };

  const onSuccess = async () => {
    await refreshEvent();
    setShowForm(false);
  };

  const onDelete = async () => {
    try {
      await deleteEvent(freshEvent._id);
      showNotification("Событие удалено", "success");
      router.replace("/events");
    } catch {
      showNotification("Ошибка при удалении", "error");
    }
    setShowConfirm(false);
  };

  if (!freshEvent) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow text-center">
        <h2 className="text-red-600 mb-3 text-xl font-semibold">
          Событие не найдено
        </h2>
        <p className="text-gray-600 mb-5">
          Похоже, указан неверный идентификатор или событие было удалено.
        </p>
        <button
          onClick={() => router.push("/events")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          ⬅ Вернуться к списку событий
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">{freshEvent.title}</h1>
      {freshEvent.image && (
        <Image
          src={freshEvent.image}
          alt={freshEvent.title}
          width={600}
          height={400}
          priority
          loading="eager"
          className="rounded-lg object-cover mb-5 w-full h-auto"
        />
      )}
      <p className="text-gray-700 mb-3">{freshEvent.description}</p>
      <p className="mb-2">
        <strong>Город:</strong> {freshEvent.city}
      </p>
      <p className="mb-5">
        <strong>Дата:</strong> {freshEvent.date}
      </p>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition transform hover:scale-105"
        >
          ✏️ Редактировать
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-600 text-white px-5 py-2 rounded-md font-medium hover:bg-red-700 transition transform hover:scale-105"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fadeInScale">
          <div className="bg-white p-6 rounded-lg w-[500px] max-w-[90%] max-h-[80vh] overflow-y-auto relative animate-fadeInScale">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Редактировать событие
            </h2>
            <EventsForm event={freshEvent} onSuccess={onSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}
