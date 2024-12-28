import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useReceipts } from '../hooks/useReceipts';
import { PRODUCT_CATEGORIES } from '../constants/categories';

export function RecentWarranties() {
  const { receipts } = useReceipts();

  const recentWarranties = [...receipts]
    .sort((a, b) => new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-base font-medium text-gray-900 mb-3">
        Derniers achats
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produit
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'achat
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentWarranties.map((warranty) => (
              <tr key={warranty.id}>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                  {warranty.product_name}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(warranty.purchase_date), 'dd MMM yyyy', { locale: fr })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}