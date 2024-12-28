import React, { createContext, useContext, useState, useEffect } from 'react';
import { openDB } from 'idb';
import type { UserProfile } from '../types/user';

interface UserContextType {
  user: UserProfile | null;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
  isPremium: boolean;
  remainingFreeSlots: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const DB_NAME = 'warranty-tracker';
const STORE_NAME = 'user-profile';
const FREE_PRODUCT_LIMIT = 10;

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const initUser = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          // Create warranties store if it doesn't exist
          if (!db.objectStoreNames.contains('warranties')) {
            db.createObjectStore('warranties', { keyPath: 'id' });
          }
          // Create user profile store if it doesn't exist
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          }
        },
      });

      let userProfile = await db.get(STORE_NAME, 'current-user');
      
      if (!userProfile) {
        userProfile = {
          id: 'current-user',
          email: '',
          notificationPreferences: {
            email: true,
            push: false,
            sms: false,
            calendar: {
              google: false,
              outlook: false,
            },
          },
          subscriptionTier: 'free',
        };
        await db.put(STORE_NAME, userProfile);
      }
      
      setUser(userProfile);
    };

    initUser();
  }, []);

  const updateUser = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    const db = await openDB(DB_NAME, 1);
    const updatedUser = { ...user, ...updates };
    await db.put(STORE_NAME, updatedUser);
    setUser(updatedUser);
  };

  const isPremium = user?.subscriptionTier === 'premium';
  const remainingFreeSlots = FREE_PRODUCT_LIMIT;

  return (
    <UserContext.Provider value={{ user, updateUser, isPremium, remainingFreeSlots }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}