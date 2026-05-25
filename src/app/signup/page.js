"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/app/context/notification-context";
import styles from "./Signup.module.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { showNotification } = useNotification();
  const router = useRouter();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      showNotification(data.message, "success");
      router.push("/signin");
    } else {
      showNotification(data.message, "error");
    }
  };

  return (
    <div className={styles.signupPage}>
      <h1>Регистрация</h1>
      <form onSubmit={onSubmit} className={styles.signupForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Введите email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>

        <button type="submit">Зарегистрироваться</button>
      </form>

      <p className={styles.switchAuth}>
        Уже есть аккаунт? <a href="/signin">Войти</a>
      </p>
    </div>
  );
}
