"use client";

import { useRouter } from "next/navigation";
import { useNotification } from "@/context/notification-context";
import FormFactory from "@/components/FormFactory";
import { usersSchema } from "@/validation/usersSchema";
import { signupUser } from "./actions";
import styles from "./Signup.module.css";

export default function SignupPage() {
  const { showNotification } = useNotification();
  const router = useRouter();

  const fields = [
    {
      name: "nickname",
      type: "text",
      placeholder: "Введите nickname",
      required: true,
    },
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
    try {
      const res = await signupUser(data);
      showNotification(res.message, "success");
      router.push("/signin");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  return (
    <div className={styles.signupPage}>
      <h1>Регистрация</h1>
      <FormFactory
        schema={usersSchema}
        fields={fields}
        onSubmit={onSubmit}
        styles={{ ...styles, form: styles.signupForm }}
      />

      <p className={styles.switchAuth}>
        Уже есть аккаунт? <a href="/signin">Войти</a>
      </p>
    </div>
  );
}
