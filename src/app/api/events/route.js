import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("auth-demo");
    const events = await db.collection("events").find({}).toArray();

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("auth-demo");
    const body = await req.json();

    await db.collection("events").insertOne(body);

    return Response.json({ message: "Events added successfully" });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
