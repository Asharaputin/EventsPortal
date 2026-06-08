"use client";

import { useRouter } from "next/navigation";
import Link from "next/link"; // Заменили <a> на Link для оптимизации Next.js
import { useNotification } from "@/context/notification-context";
import FormFactory from "@/components/FormFactory";
import { usersSchema } from "@/validation/usersSchema";
import { signupUser } from "./actions";

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
    <div className="max-w-[420px] mx-auto mt-10 p-6 bg-white rounded-[10px] shadow-lg text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Регистрация</h1>

      <FormFactory
        schema={usersSchema}
        fields={fields}
        onSubmit={onSubmit}
        styles={{
          form: "flex flex-col gap-[18px] text-left w-full",
          input:
            "w-full p-2.5 border border-gray-300 rounded-md text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all",
          button:
            "w-full bg-blue-600 text-white p-3 rounded-md font-semibold text-base hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-sm",
          errorField: "border-2 border-red-500 bg-red-50",
          error: "text-red-500 text-[0.85rem] -mt-2 mb-2",
        }}
      />

      <p className="mt-5 text-[0.9rem] text-center text-gray-600">
        Уже есть аккаунт?{" "}
        <Link
          href="/signin"
          className="text-blue-500 font-semibold hover:underline"
        >
          Войти
        </Link>
      </p>
    </div>
  );
}
