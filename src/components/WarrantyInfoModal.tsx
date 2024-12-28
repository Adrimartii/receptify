import React from 'react';
import { X } from 'lucide-react';

interface WarrantyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WarrantyInfoModal({ isOpen, onClose }: WarrantyInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Garantie légale de conformité</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 text-base text-gray-600">
          <p>
            La garantie légale de conformité est une protection du consommateur imposée par la loi européenne.
          </p>
          <p>
            Pour les biens neufs achetés après le 1er janvier 2022, cette garantie est valable pendant 2 ans à partir de la date d'achat.
          </p>
          <p>
            Durant cette période, le vendeur est tenu de réparer ou remplacer le produit en cas de défaut de conformité, sans frais pour le consommateur.
          </p>
        </div>
      </div>
    </div>
  );
}