"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormFactory from "@/components/FormFactory";
import { signinSchema } from "@/validation/signinSchema";
import { useNotification } from "@/context/notification-context";
import styles from "./Signin.module.css";

export default function SigninPage() {
  const router = useRouter();
  const { showNotification } = useNotification();

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Введите email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Введите пароль",
      required: true,
    },
  ];

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
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
      <FormFactory
        schema={signinSchema}
        fields={fields}
        onSubmit={onSubmit}
        styles={{ ...styles, form: styles.signinForm }}
      />

      <p className={styles.switchAuth}>
        Нет аккаунта?{" "}
        <Link href="/signup" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
