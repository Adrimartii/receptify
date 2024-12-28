import React from 'react';
import { Link } from 'react-router-dom';
import { Receipt, Shield, Bell, Calendar } from 'lucide-react';

export function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-50 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        <div className="text-center">
          <Receipt className="h-16 w-16 text-brand-600 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Gérez vos garanties <span className="text-brand-600">simplement</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Ne perdez plus jamais vos tickets de caisse et gardez un œil sur vos garanties.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-xl max-w-3xl mx-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Receipt className="h-6 w-6 text-brand-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Stockage sécurisé</h3>
                <p className="mt-1 text-sm text-gray-500 break-words">Conservez tous vos reçus au même endroit</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-brand-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Protection garantie</h3>
                <p className="mt-1 text-sm text-gray-500 break-words">Suivez les dates d'expiration</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bell className="h-6 w-6 text-brand-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Notifications</h3>
                <p className="mt-1 text-sm text-gray-500 break-words">Recevez des alertes intelligentes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-6 w-6 text-brand-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Synchronisation</h3>
                <p className="mt-1 text-sm text-gray-500 break-words">Intégration calendrier</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-brand-600 hover:bg-brand-700 shadow-lg transition-colors"
          >
            Commencer gratuitement
          </Link>
          <div className="mt-6">
            <Link to="/login" className="text-sm text-gray-500 hover:text-brand-600">
              Déjà inscrit ? Connectez-vous
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}