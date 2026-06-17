"use client";

import { useState } from "react";
import { useNotification } from "@/context/notification-context";
import { useSession } from "next-auth/react";

export default function ChangePasswordPage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const { showNotification } = useNotification();

  const isGoogleUser = session?.user?.provider === "google";

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session?.user?.email, ...formData }),
    });
    const data = await res.json();
    showNotification(data.message, res.ok ? "success" : "error");
    setFormData({ oldPassword: "", newPassword: "" });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Смена пароля</h1>
      {isGoogleUser ? (
        <p className="text-gray-600">
          Вы вошли через Google. Смена пароля недоступна.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 text-left">
          <div className="flex flex-col">
            <label
              htmlFor="oldPassword"
              className="mb-1 font-semibold text-sm text-gray-700"
            >
              Старый пароль
            </label>
            <input
              id="oldPassword"
              type="password"
              name="oldPassword"
              placeholder="Введите старый пароль"
              value={formData.oldPassword}
              onChange={onChange}
              required
              className="px-3 py-2 border border-gray-300 rounded-md text-base focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="newPassword"
              className="mb-1 font-semibold text-sm text-gray-700"
            >
              Новый пароль
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              placeholder="Введите новый пароль"
              value={formData.newPassword}
              onChange={onChange}
              required
              className="px-3 py-2 border border-gray-300 rounded-md text-base focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-blue-700 hover:scale-105 transition"
          >
            Изменить пароль
          </button>
        </form>
      )}
    </div>
  );
}
