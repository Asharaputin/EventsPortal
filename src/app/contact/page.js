"use client";

import styles from "./Contact.module.css";

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <h1>Контакты</h1>
      <p>Вы можете связаться с нами:</p>
      <ul className={styles.contactList}>
        <li>
          📧 Email: <a href="mailto:info@example.com">info@example.com</a>
        </li>
        <li>
          📞 Телефон: <a href="tel:+380123456789">+380 12 345 6789</a>
        </li>
        <li>📍 Адрес: г. Сумы, Украина</li>
      </ul>
    </div>
  );
}
