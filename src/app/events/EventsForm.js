"use client";

import { useState, useEffect } from "react";
import { useNotification } from "@/app/context/notification-context";
import styles from "./EventsForm.module.css";

export default function EventsForm({ event, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    date: "",
    image: "",
  });
  const [error, setError] = useState("");
  const { showNotification } = useNotification();

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        description: event.description || "",
        city: event.city || "",
        date: event.date || "",
        image: event.image || "",
      });
    }
  }, [event]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.image && !validateUrl(form.image)) {
      setError("Введите корректный URL картинки");
      return;
    }

    setError("");

    let res;
    if (event?._id) {
      res = await fetch(`/api/events/${event._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    if (res.ok) {
      showNotification("Событие сохранено", "success");
      onSuccess();
    } else {
      showNotification("Ошибка при сохранении", "error");
      setError("Ошибка при добавлении события");
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        name="title"
        placeholder="Название"
        value={form.title}
        onChange={onChange}
        required
      />
      <textarea
        name="description"
        placeholder="Описание"
        value={form.description}
        onChange={onChange}
        required
      />
      <input
        name="city"
        placeholder="Город"
        value={form.city}
        onChange={onChange}
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={onChange}
        required
      />
      <input
        name="image"
        placeholder="Ссылка на картинку"
        value={form.image}
        onChange={onChange}
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">{event ? "Обновить" : "Сохранить"}</button>
    </form>
  );
}
