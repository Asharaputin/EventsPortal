"use server";

import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function signupUser({ nickname, email, password }) {
  const client = await clientPromise;
  const db = client.db("auth-demo");

  const isExist = await db.collection("users").findOne({ email });

  if (isExist) {
    throw new Error("Такой email уже зарегистрирован");
  }

  const hashedPassword = await hash(password, 12);

  await db.collection("users").insertOne({
    nickname,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  return { message: "Регистрация прошла успешно" };
}
