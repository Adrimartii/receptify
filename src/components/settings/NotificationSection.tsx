import React from 'react';
import { Bell, Mail, MessageSquare, AlertTriangle } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export function NotificationSection() {
  const { user, updateUser, isPremium } = useUser();

  const handleToggle = async (type: 'email' | 'push' | 'sms') => {
    if (!user) return;
    
    if (!isPremium && type !== 'email') {
      alert('Cette fonctionnalité est réservée aux utilisateurs premium');
      return;
    }

    await updateUser({
      notificationPreferences: {
        ...user.notificationPreferences,
        [type]: !user.notificationPreferences[type],
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Bell className="h-6 w-6 text-brand-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">
          Notifications
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-gray-700">Email</span>
          </div>
          <button
            onClick={() => handleToggle('email')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              user?.notificationPreferences.email ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              user?.notificationPreferences.email ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-gray-700">Notifications push</span>
            {!isPremium && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                Premium
              </span>
            )}
          </div>
          <button
            onClick={() => handleToggle('push')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
              user?.notificationPreferences.push ? 'bg-brand-600' : 'bg-gray-200'
            }`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              user?.notificationPreferences.push ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-gray-700">SMS</span>
            {!isPremium && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                Premium
              </span>
            )}
          </div>
          <button
            onClick={() => handleToggle('sms')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
              user?.notificationPreferences.sms ? 'bg-brand-600' : 'bg-gray-200'
            }`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              user?.notificationPreferences.sms ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
}