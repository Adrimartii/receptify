import React from 'react';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PremiumBanner() {
  return (
    <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white p-4 rounded-xl shadow-lg mb-6">
      <div className="flex items-center">
        <Crown className="h-8 w-8 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-base whitespace-nowrap">Passez à Premium</h3>
          <p className="text-brand-100 text-xs">Produits illimités, notifications avancées et plus</p>
        </div>
        <Link 
          to="/settings" 
          className="bg-white text-brand-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-brand-50 transition-colors ml-2"
        >
          Découvrir
        </Link>
      </div>
    </div>
  );
}