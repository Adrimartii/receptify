import React from 'react';
import { useReceipts } from '../hooks/useReceipts';
import { useTheme } from '../context/ThemeContext';
import { Euro } from 'lucide-react';

export function TotalValue() {
  const { receipts } = useReceipts();
  const { hideValues } = useTheme();

  const total = receipts.reduce((sum, receipt) => sum + (receipt.price || 0), 0);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mb-4 backdrop-blur-lg bg-opacity-90">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Euro className="h-6 w-6 text-brand-600" />
          <h2 className="ml-2 text-sm font-medium text-gray-900">
            Valeur totale des biens
          </h2>
        </div>
        <div className="text-lg font-bold text-brand-600 whitespace-nowrap">
          {total.toLocaleString('fr-FR')}€
        </div>
      </div>
    </div>
  );
}