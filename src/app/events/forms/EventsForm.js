"use client";

import { eventSchema } from "@/validation/eventSchema";
import { useNotification } from "@/context/notification-context";
import FormFactory from "@/components/FormFactory";
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
      styles={{
        form: "flex flex-col gap-3 mt-4",
        input:
          "p-2 border border-gray-300 rounded-md text-base focus:border-yellow-400 focus:outline-none",
        textarea:
          "p-2 border border-gray-300 rounded-md text-base min-h-[100px] resize-y focus:border-yellow-400 focus:outline-none",
        button:
          "p-3 bg-gray-800 text-white rounded-md text-base font-medium cursor-pointer transition hover:bg-yellow-400 hover:text-gray-900 hover:scale-105",
        error: "text-red-600 text-sm mt-[-4px]",
        errorField: "border-2 border-red-500 bg-red-100",
      }}
    />
  );
}
