"use client";

export default function ContactPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-5">Контакты</h1>
      <p className="text-gray-700 text-lg mb-4">Вы можете связаться с нами:</p>
      <ul className="list-none p-0 m-0 space-y-3 text-gray-600">
        <li>
          📧 Email:{" "}
          <a
            href="mailto:info@example.com"
            className="text-blue-600 font-medium hover:underline"
          >
            info@example.com
          </a>
        </li>
        <li>
          📞 Телефон:{" "}
          <a
            href="tel:+380123456789"
            className="text-blue-600 font-medium hover:underline"
          >
            +380 12 345 6789
          </a>
        </li>
        <li>📍 Адрес: г. Сумы, Украина</li>
      </ul>
    </div>
  );
}
