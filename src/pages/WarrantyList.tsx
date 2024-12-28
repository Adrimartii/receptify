import React, { useState, useMemo } from 'react';
import { useReceipts } from '../hooks/useReceipts';
import { WarrantyCard } from '../components/WarrantyCard';
import { WarrantyFilters } from '../components/WarrantyFilters';
import { EmptyState } from '../components/EmptyState';

type SortOption = 'date-asc' | 'date-desc' | 'price-asc' | 'price-desc' | 'expiry-asc' | 'expiry-desc';

export function WarrantyList() {
  const { receipts, loading } = useReceipts();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  const filteredAndSortedWarranties = useMemo(() => {
    let filtered = receipts;
    
    if (selectedCategory) {
      filtered = filtered.filter(w => w.category === selectedCategory);
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime();
        case 'date-desc':
          return new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime();
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'expiry-asc':
          return new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime();
        case 'expiry-desc':
          return new Date(b.expiry_date).getTime() - new Date(b.expiry_date).getTime();
        default:
          return 0;
      }
    });
  }, [receipts, selectedCategory, sortBy]);

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  if (receipts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Mes biens
        </h2>
        <WarrantyFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredAndSortedWarranties.map((receipt) => (
          <WarrantyCard key={receipt.id} receipt={receipt} />
        ))}
      </div>
    </div>
  );
}