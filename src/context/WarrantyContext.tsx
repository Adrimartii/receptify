import React, { createContext, useContext, useEffect, useState } from 'react';
import { openDB } from 'idb';
import { useNotifications } from './NotificationContext';

interface Warranty {
  id: string;
  productName: string;
  purchaseDate: string;
  expiryDate: string;
  imageUrl: string;
}

interface WarrantyContextType {
  warranties: Warranty[];
  addWarranty: (warranty: Warranty) => Promise<void>;
  deleteWarranty: (id: string, reason: { type: 'sold' | 'discarded' | 'other'; details?: string }) => Promise<void>;
}

const WarrantyContext = createContext<WarrantyContextType | undefined>(undefined);

const DB_NAME = 'warranty-tracker';
const STORE_NAME = 'warranties';

export function WarrantyProvider({ children }: { children: React.ReactNode }) {
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const { scheduleNotification } = useNotifications();

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          }
        },
      });

      const items = (await db.getAll(STORE_NAME)).filter(item => !item.deleted);
      setWarranties(items);
    };

    initDB();
  }, []);

  const addWarranty = async (warranty: Warranty) => {
    const db = await openDB(DB_NAME, 1);
    await db.add(STORE_NAME, warranty);
    setWarranties((prev) => [...prev, warranty]);

    // Schedule notification 7 days before expiry
    const expiryDate = new Date(warranty.expiryDate);
    const notificationDate = new Date(expiryDate);
    notificationDate.setDate(notificationDate.getDate() - 7);
    
    scheduleNotification(
      warranty.id,
      `La garantie pour ${warranty.productName} expire dans 7 jours`,
      notificationDate
    );
  };

  const deleteWarranty = async (
    id: string,
    reason: { type: 'sold' | 'discarded' | 'other'; details?: string }
  ) => {
    const db = await openDB(DB_NAME, 1);
    const warranty = await db.get(STORE_NAME, id);
    if (warranty) {
      warranty.deleted = true;
      warranty.deletionReason = reason;
      await db.put(STORE_NAME, warranty);
      setWarranties((prev) => prev.filter((w) => w.id !== id));
    }
  };
  return (
    <WarrantyContext.Provider value={{ warranties, addWarranty, deleteWarranty }}>
      {children}
    </WarrantyContext.Provider>
  );
}

export function useWarranties() {
  const context = useContext(WarrantyContext);
  if (context === undefined) {
    throw new Error('useWarranties must be used within a WarrantyProvider');
  }
  return context;
}