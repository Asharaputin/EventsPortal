"use client";

import { useState } from "react";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  const [closing, setClosing] = useState(false);

  const onClose = (callback) => {
    setClosing(true);
    setTimeout(callback, 300);
  };

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.fadeOut : ""}`}
      onClick={() => onClose(onCancel)}
    >
      <div
        className={`${styles.modal} ${closing ? styles.fadeOut : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <p>{message}</p>
        <div className={styles.actions}>
          <button onClick={() => onClose(onConfirm)} className={styles.confirm}>
            Да
          </button>
          <button onClick={() => onClose(onCancel)} className={styles.cancel}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}
