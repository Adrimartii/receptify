import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useReceipts } from '../hooks/useReceipts';

export function ExpirationAlert() {
  const { receipts } = useReceipts();
  const today = new Date();

  const expiringWarranty = receipts
    .filter(warranty => {
      const daysUntilExpiry = differenceInDays(new Date(warranty.expiry_date), today);
      return daysUntilExpiry >= 0 && daysUntilExpiry <= 30;
    })
    .sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime())[0];

  if (!expiringWarranty) return null;

  const daysUntilExpiry = differenceInDays(new Date(expiringWarranty.expiry_date), today);

  return (
    <div className="bg-red-50 border border-red-200 p-6 mb-6 rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-90">
      <div className="flex items-center">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Garantie proche de l'expiration
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              La garantie de <strong>{expiringWarranty.product_name}</strong> expire{' '}
              {daysUntilExpiry === 0 ? "aujourd'hui" : `dans ${daysUntilExpiry} jours`}{' '}
              (le {format(new Date(expiringWarranty.expiry_date), 'dd MMMM yyyy', { locale: fr })})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}