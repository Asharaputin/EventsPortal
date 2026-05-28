"use client";

import { useNotification } from "@/context/notification-context";
import "./Notification.css";

export default function Notification() {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
}
