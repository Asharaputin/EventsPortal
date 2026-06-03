export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
        🎉 Welcome to Events Portal
      </h1>
      <p className="text-gray-700 text-lg md:text-xl mb-6 max-w-2xl">
        Это главная страница приложения. Здесь вы найдёте самые интересные
        события, сможете узнать подробности и добавить свои собственные!
      </p>
      <a
        href="/events"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:-translate-y-0.5"
      >
        Смотреть события
      </a>
    </div>
  );
}
