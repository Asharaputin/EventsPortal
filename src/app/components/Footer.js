import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <strong>Полезные ссылки:</strong>
        <ul>
          <li>
            <Link href="/events">Все события</Link>
          </li>
          <li>
            <Link href="/about">О проекте</Link>
          </li>
          <li>
            <Link href="/contact">Контакты</Link>
          </li>
        </ul>
      </div>

      <div>
        <strong>Мы в соцсетях:</strong>
        <div className={styles.social}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className={styles.copy}>
        <small>
          © {new Date().getFullYear()} Events Portal. Все права защищены.
        </small>
      </div>
    </footer>
  );
}
