"use client";

import { useState } from "react";
import { useNotification } from "@/app/context/notification-context";
import { useSession } from "next-auth/react";
import styles from "./ChangePassword.module.css";

export default function ChangePasswordPage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const { showNotification } = useNotification();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session?.user?.email,
        ...formData,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      showNotification(data.message, "success");
    } else {
      showNotification(data.message, "error");
    }

    setFormData({ oldPassword: "", newPassword: "" });
  };

  return (
    <div className={styles.changePage}>
      <h1>Смена пароля</h1>
      <form onSubmit={onSubmit} className={styles.changeForm}>
        <div className={styles.formGroup}>
          <label htmlFor="oldPassword">Старый пароль</label>
          <input
            id="oldPassword"
            type="password"
            name="oldPassword"
            placeholder="Введите старый пароль"
            value={formData.oldPassword}
            onChange={onChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="newPassword">Новый пароль</label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            placeholder="Введите новый пароль"
            value={formData.newPassword}
            onChange={onChange}
            required
          />
        </div>

        <button type="submit">Изменить пароль</button>
      </form>
    </div>
  );
}
