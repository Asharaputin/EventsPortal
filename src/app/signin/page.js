"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotification } from "@/app/context/notification-context";
import styles from "./Signin.module.css";

export default function SigninPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  const { showNotification } = useNotification();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (!result?.error) {
      showNotification("Вы успешно вошли!", "success");
      router.push("/events");
    } else {
      showNotification("Неверный email или пароль", "error");
    }
  };

  return (
    <div className={styles.signinPage}>
      <h1>Вход</h1>
      <form onSubmit={onSubmit} className={styles.signinForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
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
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>

        <button type="submit">Войти</button>
      </form>

      <p className={styles.switchAuth}>
        Нет аккаунта?{" "}
        <Link href="/signup" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
