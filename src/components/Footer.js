import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-8 py-3 text-center">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-2">
          <div>
            <strong className="block mb-1 text-sm">Полезные ссылки:</strong>
            <ul className="flex gap-4 justify-center md:justify-start list-none p-0 m-0 text-sm">
              <li>
                <Link
                  href="/events"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Все события
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  О проекте
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <strong className="block mb-1 text-sm">Мы в соцсетях:</strong>
            <div className="flex gap-4 justify-center md:justify-start text-sm">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-600">
          © {new Date().getFullYear()} Events Portal. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
