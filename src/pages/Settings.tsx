import React from 'react';
import { PersonalInfoSection } from '../components/settings/PersonalInfoSection';
import { NotificationSection } from '../components/settings/NotificationSection';
import { SubscriptionSection } from '../components/settings/SubscriptionSection';
import { CalendarSection } from '../components/settings/CalendarSection';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export function Settings() {
  const { signOut } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
      <div className="space-y-6">
        <PersonalInfoSection />
        <NotificationSection />
        <CalendarSection />
        <SubscriptionSection />
        <div className="bg-white rounded-lg shadow p-6">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}