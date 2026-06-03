import Link from "next/link";
import Image from "next/image";

export default function EventCard({ event }) {
  return (
    <div className="max-w-[410px] w-full rounded-lg border border-gray-300 overflow-hidden bg-white shadow-sm hover:shadow-md transition flex flex-col mx-auto font-sans">
      {event.image && (
        <div className="pt-[14px] px-[14px]">
          <Image
            src={event.image}
            alt={event.title}
            width={400}
            height={250}
            loading="eager"
            className="rounded-md object-cover w-full h-auto aspect-[16/10]"
          />
        </div>
      )}
      <div className="bg-gray-50 pt-5 px-4 pb-4 flex flex-col flex-grow">
        <h2 className="text-[18px] font-bold text-gray-900 mb-2 m-0 leading-snug">
          {event.title}
        </h2>
        <p className="text-gray-600 text-[13px] mb-4 m-0 leading-normal">
          {event.city} — {event.date}
        </p>
        <div className="flex justify-end mt-auto">
          <Link
            href={`/events/${event._id}`}
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition font-medium text-[13px] no-underline"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
}
