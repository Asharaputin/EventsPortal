import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(_, context) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 404 });
    }

    const client = await clientPromise;
    const db = client.db("auth-demo");
    const eventsCollection = db.collection("events");
    const event = await eventsCollection.findOne({ _id: new ObjectId(id) });

    if (!event) {
      return new Response(JSON.stringify({ error: "Событие не найдено" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(event), { status: 200 });
  } catch (error) {
    console.error("Ошибка получения события:", error);
    return new Response(JSON.stringify({ error: "Ошибка сервера" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const data = await req.json();

    const client = await clientPromise;
    const db = client.db("auth-demo");
    const eventsCollection = db.collection("events");

    const result = await eventsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" },
    );

    if (!result) {
      return new Response(JSON.stringify({ error: "Событие не найдено" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(result.value), { status: 200 });
  } catch (error) {
    console.error("Ошибка обновления события:", error);
    return new Response(JSON.stringify({ error: "Ошибка сервера" }), {
      status: 500,
    });
  }
}

export async function DELETE(_, { params }) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db("auth-demo");
  const eventsCollection = db.collection("events");

  const result = await eventsCollection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return new Response(JSON.stringify({ error: "Событие не найдено" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ message: "Событие удалено" }), {
    status: 200,
  });
}
