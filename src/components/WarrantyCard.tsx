import React, { useState, useEffect } from 'react';
import { isAfter, isBefore, differenceInDays, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Receipt, AlertTriangle, Euro, Tag, Trash2, Maximize2 } from 'lucide-react';
import { DeleteWarrantyModal } from './DeleteWarrantyModal';
import { ReceiptViewerModal } from './ReceiptViewerModal';
import { useReceipts } from '../hooks/useReceipts';
import { PRODUCT_CATEGORIES } from '../constants/categories';
import { useTheme } from '../context/ThemeContext';
import type { Receipt as ReceiptType } from '../types/receipt';
import { getSignedUrl } from '../utils/storage';

interface WarrantyCardProps {
  receipt: ReceiptType;
}

export function WarrantyCard({ receipt }: WarrantyCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [signedImageUrl, setSignedImageUrl] = useState<string>('');
  const { removeReceipt } = useReceipts();
  const { hideValues } = useTheme();

  useEffect(() => {
    if (receipt.image_url) {
      const path = receipt.image_url.split('/').slice(-2).join('/');
      getSignedUrl(path)
        .then(url => setSignedImageUrl(url))
        .catch(console.error);
    }
  }, [receipt.image_url]);

  const today = new Date();
  const expiryDate = new Date(receipt.expiry_date);
  const purchaseDate = new Date(receipt.purchase_date);
  const daysUntilExpiry = differenceInDays(expiryDate, today);

  const getWarrantyStatus = () => {
    if (isBefore(expiryDate, today)) {
      return {
        label: 'Expirée',
        className: 'bg-red-100 text-red-800'
      };
    }
    if (daysUntilExpiry <= 30) {
      return {
        label: 'Bientôt expirée',
        className: 'bg-yellow-100 text-yellow-800'
      };
    }
    if (isAfter(today, purchaseDate) && isAfter(expiryDate, today)) {
      return {
        label: 'Active',
        className: 'bg-green-100 text-green-800'
      };
    }
    return {
      label: 'Active',
      className: 'bg-green-100 text-green-800'
    };
  };

  const status = getWarrantyStatus();

  const handleDelete = async (reason: { type: 'sold' | 'discarded' | 'other'; details?: string }) => {
    await removeReceipt(receipt.id, reason);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
    <div className="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Receipt className="h-6 w-6 text-brand-500" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {receipt.product_name}
            </h3>
            <div className="mt-1">
              <p className="text-sm text-gray-500">
                {PRODUCT_CATEGORIES.find(cat => cat.id === receipt.category)?.label}
              </p>
              <p className="text-sm text-gray-500">
                Acheté le {format(purchaseDate, 'dd MMMM yyyy', { locale: fr })}
              </p>
              <p className="text-sm text-gray-500">
                Expire le {format(expiryDate, 'dd MMMM yyyy', { locale: fr })}
              </p>
              {receipt.price !== undefined && (
                <p className="text-sm text-gray-500">
                  Prix: {hideValues ? '••••' : `${receipt.price.toLocaleString('fr-FR')} €`}
                </p>
              )}
            </div>
          </div>
          {status.label !== 'Active' && (
            <div className="ml-4">
              <AlertTriangle className={`h-6 w-6 ${status.label === 'Expirée' ? 'text-red-500' : 'text-yellow-500'}`} />
            </div>
          )}
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="ml-4 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        {receipt.image_url && (
          <div className="mt-4 relative group">
            <img
              src={signedImageUrl}
              alt="Reçu"
              className="w-full h-32 object-cover rounded-xl"
            />
            <button
              onClick={() => setIsViewerOpen(true)}
              className="absolute inset-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Maximize2 className="h-8 w-8 text-white" />
            </button>
          </div>
        )}
      </div>
      <div className="bg-brand-50 px-5 py-3">
        <div className="text-sm">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}
          >
            {status.label}
          </span>
        </div>
      </div>
    </div>
    <DeleteWarrantyModal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      onConfirm={handleDelete}
    />
    <ReceiptViewerModal
      isOpen={isViewerOpen}
      onClose={() => setIsViewerOpen(false)}
      imageUrl={signedImageUrl}
      productName={receipt.product_name}
    />
    </>
  );
}