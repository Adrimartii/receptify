import React, { createContext, useContext, useEffect } from 'react';
import { isStackBlitz } from '../utils/environment';

interface NotificationContextType {
  scheduleNotification: (id: string, message: string, date: Date) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('Notification' in window && !isStackBlitz()) {
      Notification.requestPermission();
    }
  }, []);

  const scheduleNotification = (id: string, message: string, date: Date) => {
    if (!('Notification' in window) || isStackBlitz()) {
      console.log('Notifications not supported');
      return;
    }

    const now = new Date();
    const delay = date.getTime() - now.getTime();

    if (delay > 0) {
      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification('Receptify', {
            body: message,
            icon: '/icon-192.png',
          });
        }
      }, delay);
    }
  };

  return (
    <NotificationContext.Provider value={{ scheduleNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }
  return context;
}