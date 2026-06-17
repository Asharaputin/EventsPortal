"use client";

import { useEffect } from "react";
import { useNotification } from "@/context/notification-context";

export default function Notification() {
  const { notification, showNotification } = useNotification();

  useEffect(() => {
    if (!notification) {
      const saved = localStorage.getItem("notification");
      if (saved) {
        const { message, type } = JSON.parse(saved);
        showNotification(message, type);
      }
    }
  }, [notification, showNotification]);

  if (!notification) return null;

  const baseClasses =
    "fixed bottom-5 left-5 px-6 py-4 rounded-lg text-white font-medium text-base z-50 animate-fadeInScale";

  const typeClasses = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[notification.type]}`}>
      {notification.message}
    </div>
  );
}
