export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
        🚀 О проекте Events Portal
      </h1>
      <p className="text-gray-700 text-lg mb-8">
        Наш портал создан для того, чтобы объединять людей вокруг интересных
        событий. Здесь можно найти мероприятия в своём городе, узнать
        подробности и даже добавить собственные!
      </p>

      <div className="grid md:grid-cols-3 gap-6 text-left">
        <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            🎉 Найди событие
          </h2>
          <p className="text-gray-600 text-sm">
            Просматривай список мероприятий и выбирай то, что тебе интересно.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            🤝 Делись опытом
          </h2>
          <p className="text-gray-600 text-sm">
            Добавляй свои события и приглашай других присоединиться.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            🌍 Будь в курсе
          </h2>
          <p className="text-gray-600 text-sm">
            Следи за новыми мероприятиями и не пропускай важные события.
          </p>
        </div>
      </div>
    </div>
  );
}
