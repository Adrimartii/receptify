import React from 'react';
import { Link } from 'react-router-dom';
import { Receipt } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center">
      <Receipt className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Aucune garantie
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Commencez par ajouter votre premier reçu ou garantie.
      </p>
      <div className="mt-6">
        <Link
          to="/add"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
        >
          Ajouter un reçu
        </Link>
      </div>
    </div>
  );
}