"use client";

import { useState, useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import EventCard from "./EventCard";
import EventsForm from "@/app/events/forms/EventsForm";
import { getEvents } from "@/app/events/actions";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function EventsList({ events: initialEvents }) {
  const [events, setEvents] = useState(initialEvents);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [closing, setClosing] = useState(false);
  const [sortedEvents, setSortedEvents] = useState(initialEvents);
  const [sortKey, setSortKey] = useState("city");

  useEffect(() => {
    const worker = new Worker(
      new URL("../workers/eventWorker.js", import.meta.url),
    );

    worker.onmessage = (e) => {
      setSortedEvents(e.data);
    };

    worker.postMessage({ events, sortKey });

    return () => worker.terminate();
  }, [events, sortKey]);

  const parentRef = useRef(null);
  const rowCount = Math.ceil(events.length / 3);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 440,
    overscan: 10,
  });

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
    <div className="w-full max-w-8xl mx-auto p-6">
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition transform hover:-translate-y-0.5"
      >
        <PlusCircleIcon className="w-5 h-5 text-white" />
        Добавить событие
      </button>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setSortKey("city")}
          className={`px-4 py-2 rounded-md font-semibold transition 
      ${
        sortKey === "city"
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
        >
          Сортировать по городу
        </button>
        <button
          onClick={() => setSortKey("date")}
          className={`px-4 py-2 rounded-md font-semibold transition 
      ${
        sortKey === "date"
          ? "bg-purple-600 text-white hover:bg-purple-700"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
        >
          Сортировать по дате
        </button>
      </div>

      {showForm && (
        <div
          className={`fixed inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center z-50 ${
            closing ? "animate-fadeOutScale" : "animate-fadeInScale"
          }`}
        >
          <div
            className={`relative bg-white p-6 rounded-lg w-[500px] max-w-[90%] ${
              closing ? "animate-fadeOutScale" : "animate-fadeInScale"
            }`}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 bg-transparent border-none cursor-pointer p-1 rounded hover:bg-gray-100 transition"
            >
              <XMarkIcon className="w-6 h-6 text-red-500" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Добавить событие</h2>
            <EventsForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}

      {loading && (
        <p className="mt-4 text-gray-600">Обновляем список событий…</p>
      )}
      <div
        ref={parentRef}
        className="mt-6 h-[80vh] overflow-x-hidden overflow-y-auto border rounded-lg bg-gray-50 px-6 py-6"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const startIndex = virtualRow.index * 3;
            const rowEvents = sortedEvents.slice(startIndex, startIndex + 3);

            return (
              <div
                key={virtualRow.index}
                className="absolute top-0 left-0 w-full flex justify-center"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  height: "360px",
                }}
              >
                {/* Сетка внутри контейнера занимает 100% его ширины */}
                <div className="grid grid-cols-3 gap-6 w-full">
                  {rowEvents.map((event) => (
                    <div key={event._id} className="w-full">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
