import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Заполните все поля" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("auth-demo");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Пользователь не найден" },
        { status: 404 },
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Неверный пароль" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Вход выполнен",
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
