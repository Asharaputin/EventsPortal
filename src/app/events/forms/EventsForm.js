"use client";

import { eventSchema } from "@/validation/eventSchema";
import { useNotification } from "@/context/notification-context";
import FormFactory from "@/components/FormFactory";
import styles from "./EventsForm.module.css";
import { createEvent, updateEvent } from "../actions";

export default function EventsForm({ event, onSuccess }) {
  const { showNotification } = useNotification();

  const fields = [
    { name: "title", placeholder: "Название", required: true },
    {
      name: "description",
      placeholder: "Описание",
      type: "textarea",
      required: true,
    },
    { name: "city", placeholder: "Город", required: true },
    { name: "date", type: "date", placeholder: "Дата", required: true },
    { name: "image", placeholder: "Ссылка на картинку" },
  ];

  const onSubmit = async (data) => {
    try {
      if (event?._id) {
        await updateEvent(event._id, data);
      } else {
        await createEvent(data);
      }
      showNotification("Событие сохранено", "success");
      onSuccess();
    } catch {
      showNotification("Ошибка при сохранении", "error");
    }
  };

  return (
    <FormFactory
      schema={eventSchema}
      fields={fields}
      initialData={event}
      onSubmit={onSubmit}
      styles={styles}
    />
  );
}
