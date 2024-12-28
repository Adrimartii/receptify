import React, { useState } from 'react';
import { X } from 'lucide-react';

interface DeleteWarrantyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: { type: 'sold' | 'discarded' | 'other'; details?: string }) => void;
}

export function DeleteWarrantyModal({ isOpen, onClose, onConfirm }: DeleteWarrantyModalProps) {
  const [reasonType, setReasonType] = useState<'sold' | 'discarded' | 'other'>('sold');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      type: reasonType,
      ...(reasonType === 'other' && details ? { details } : {}),
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Supprimer le reçu</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motif de suppression
            </label>
            <select
              value={reasonType}
              onChange={(e) => setReasonType(e.target.value as any)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="sold">Vendu</option>
              <option value="discarded">Jeté</option>
              <option value="other">Autre</option>
            </select>
          </div>

          {reasonType === 'other' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Précisez (facultatif)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
              />
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
            >
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}