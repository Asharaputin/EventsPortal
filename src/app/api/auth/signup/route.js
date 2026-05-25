import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Заполните все поля" },
      { status: 400 },
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("auth-demo");
    const usersCollection = db.collection("users");

    const isUserExist = await usersCollection.findOne({ email });

    if (isUserExist) {
      return NextResponse.json(
        { message: "Пользователь уже существует" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await usersCollection.insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Регистрация успешна" });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
