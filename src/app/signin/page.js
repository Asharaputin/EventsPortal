"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormFactory from "@/components/FormFactory";
import { signinSchema } from "@/validation/signinSchema";
import { useNotification } from "@/context/notification-context";

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-6">Вход</h1>
      <FormFactory
        schema={signinSchema}
        fields={fields}
        onSubmit={onSubmit}
        styles={{
          form: "flex flex-col gap-5 text-left",
          input:
            "px-3 py-2 border border-gray-300 rounded-md text-base focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition",
          button:
            "bg-green-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-green-700 hover:-translate-y-0.5 transition",
          errorField: "border-2 border-red-500 bg-red-50",
          error: "text-red-600 text-sm mt-1 mb-2 text-center",
        }}
      />

      <p className="mt-5 text-sm text-center">
        Нет аккаунта?{" "}
        <Link
          href="/signup"
          className="text-green-600 font-semibold hover:underline"
        >
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
