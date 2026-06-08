"use client";

import { useState } from "react";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  const [closing, setClosing] = useState(false);

  const onClose = (callback) => {
    setClosing(true);
    setTimeout(callback, 300);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${
        closing ? "animate-fadeOutScale" : "animate-fadeInScale"
      }`}
      onClick={() => onClose(onCancel)}
    >
      <div
        className={`bg-white px-6 py-5 rounded-lg min-w-[300px] text-center shadow-md ${
          closing ? "animate-fadeOutScale" : "animate-fadeInScale"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-gray-800">{message}</p>
        <div className="mt-5 flex justify-center gap-8">
          <button
            onClick={() => onClose(onConfirm)}
            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
          >
            Да
          </button>
          <button
            onClick={() => onClose(onCancel)}
            className="bg-gray-300 px-5 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}
