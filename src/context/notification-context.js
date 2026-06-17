"use client";

import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    const notif = { message, type };
    localStorage.setItem("notification", JSON.stringify(notif));
    setNotification(notif);

    setTimeout(() => {
      localStorage.removeItem("notification");
      setNotification(null);
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
