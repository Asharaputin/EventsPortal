import Link from "next/link";
import Image from "next/image";

export default function EventCard({ event }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "20px",
      }}
    >
      {event.image && (
        <Image
          src={event.image}
          alt={event.title}
          width={400}
          height={250}
          loading="eager"
          style={{
            borderRadius: "6px",
            objectFit: "cover",
            marginBottom: "12px",
          }}
        />
      )}
      <h2>{event.title}</h2>
      <p>
        {event.city} — {event.date}
      </p>
      <Link href={`/events/${event._id}`}>Подробнее</Link>
    </div>
  );
}
