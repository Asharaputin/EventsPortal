import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const dbHelper = {
  async insertEvent(data) {
    const client = await clientPromise;
    const db = client.db("auth-demo");
    const result = await db.collection("events").insertOne(data);

    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId.toString(),
    };
  },

  async getEvents() {
    const client = await clientPromise;
    const db = client.db("auth-demo");
    const events = await db.collection("events").find({}).toArray();

    return events.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  },

  async getEventById(id) {
    const client = await clientPromise;
    const db = client.db("auth-demo");
    const event = await db
      .collection("events")
      .findOne({ _id: new ObjectId(id) });

    if (!event) return null;

    return {
      ...event,
      _id: event._id.toString(),
    };
  },

  async updateEvent(id, event) {
    const client = await clientPromise;
    const db = client.db("auth-demo");

    const result = await db
      .collection("events")
      .updateOne({ _id: new ObjectId(id) }, { $set: event });

    return result;
  },

  async deleteEvent(id) {
    const client = await clientPromise;
    const db = client.db("auth-demo");
    const result = await db
      .collection("events")
      .deleteOne({ _id: new ObjectId(id) });

    return result;
  },
};
