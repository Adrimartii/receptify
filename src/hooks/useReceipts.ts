import { useState, useEffect } from 'react';
import { getUserReceipts, deleteReceipt } from '../services/receipts';
import { deleteReceiptImage } from '../utils/storage';
import type { Receipt } from '../types/receipt';

export function useReceipts() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReceipts();
  }, []);

  const loadReceipts = async () => {
    try {
      const data = await getUserReceipts();
      setReceipts(data);
    } catch (err) {
      setError('Erreur lors du chargement des reçus');
      console.error('Error loading receipts:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeReceipt = async (
    id: string,
    reason: { type: 'sold' | 'discarded' | 'other'; details?: string }
  ) => {
    try {
      const receipt = receipts.find(r => r.id === id);
      if (!receipt) return;

      await deleteReceipt(id, reason);
      await deleteReceiptImage(receipt.image_url);
      setReceipts(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression du reçu');
      console.error('Error deleting receipt:', err);
    }
  };

  return {
    receipts,
    loading,
    error,
    removeReceipt,
    refresh: loadReceipts
  };
}