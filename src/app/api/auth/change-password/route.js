import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, oldPassword, newPassword } = await req.json();

  if (!email || !oldPassword || !newPassword) {
    return NextResponse.json(
      { message: "Заполните все поля" },
      { status: 400 },
    );
  }

  try {
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

    const isValid = await bcrypt.compare(oldPassword, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Старый пароль неверный" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await usersCollection.updateOne(
      { email },
      { $set: { password: hashedPassword } },
    );

    return NextResponse.json(
      { message: "Пароль успешно изменён" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Ошибка при смене пароля:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
