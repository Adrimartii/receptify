import React from 'react';
import { Calendar, Mail, MailQuestion } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export function CalendarSection() {
  const { user, updateUser, isPremium } = useUser();

  const handleToggle = async (type: 'google' | 'outlook') => {
    if (!user) return;
    
    if (!isPremium) {
      alert('Cette fonctionnalité est réservée aux utilisateurs premium');
      return;
    }

    await updateUser({
      notificationPreferences: {
        ...user.notificationPreferences,
        calendar: {
          ...user.notificationPreferences.calendar,
          [type]: !user.notificationPreferences.calendar?.[type],
        },
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Calendar className="h-6 w-6 text-brand-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">
          Intégration Calendrier
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-gray-700">Google Calendar</span>
            {!isPremium && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                Premium
              </span>
            )}
          </div>
          <button
            onClick={() => handleToggle('google')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
              user?.notificationPreferences.calendar?.google ? 'bg-brand-600' : 'bg-gray-200'
            }`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              user?.notificationPreferences.calendar?.google ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MailQuestion className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-gray-700">Outlook Calendar</span>
            {!isPremium && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                Premium
              </span>
            )}
          </div>
          <button
            onClick={() => handleToggle('outlook')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
              user?.notificationPreferences.calendar?.outlook ? 'bg-brand-600' : 'bg-gray-200'
            }`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              user?.notificationPreferences.calendar?.outlook ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {!isPremium && (
          <p className="mt-4 text-sm text-gray-500">
            Passez à l'abonnement Premium pour synchroniser vos garanties avec votre calendrier préféré et ne jamais manquer une expiration.
          </p>
        )}
      </div>
    </div>
  );
}