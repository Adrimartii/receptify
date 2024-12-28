import React from 'react';
import { Crown, Check } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export function SubscriptionSection() {
  const { user, isPremium } = useUser();

  const handleSubscribe = () => {
    // Implement payment logic here
    alert('La fonctionnalité de paiement sera bientôt disponible');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <Crown className="h-6 w-6 text-brand-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">
          Abonnement
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Gratuit</h3>
          <p className="text-3xl font-bold text-gray-900 mb-6">0 €<span className="text-base font-normal text-gray-500">/mois</span></p>
          
          <ul className="space-y-4 mb-6">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-600">Jusqu'à 10 produits</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-600">Notifications par email</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-600">Fonctionnalités de base</span>
            </li>
          </ul>

          {!isPremium && (
            <div className="text-sm text-gray-500">
              Plan actuel
            </div>
          )}
        </div>

        <div className="border-2 border-brand-600 rounded-lg p-6 relative">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-brand-100 text-brand-800">
              Populaire
            </span>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-4">Premium</h3>
          <div className="mb-6">
            <p className="text-3xl font-bold text-gray-900">0,58 €<span className="text-base font-normal text-gray-500">/semaine</span></p>
            <p className="text-sm text-gray-500 mt-1">soit 30 € par an</p>
            <p className="text-sm text-brand-600 font-medium mt-1">Le prix d'un café par mois !</p>
          </div>
          
          <ul className="space-y-4 mb-6">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-600">Produits illimités</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-600">Notifications push et SMS</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-600">Export des données</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-600">Rappels personnalisés</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-600">Intégration avec les calendriers</span>
            </li>
          </ul>

          {isPremium ? (
            <div className="text-sm text-gray-500">
              Plan actuel • Expire le {new Date(user?.subscriptionExpiryDate || '').toLocaleDateString('fr-FR')}
            </div>
          ) : (
            <button
              onClick={handleSubscribe}
              className="w-full px-4 py-4 text-base font-medium text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors shadow-lg"
            >
              Paiement annuel unique de 30 €
            </button>
          )}
        </div>
      </div>
    </div>
  );
}