import React, { useState, useMemo } from 'react';
import { useReceipts } from '../hooks/useReceipts';
import { EmptyState } from '../components/EmptyState';
import { CategoryChart } from '../components/CategoryChart';
import { RecentWarranties } from '../components/RecentWarranties';
import { TotalValue } from '../components/TotalValue';
import { PremiumBanner } from '../components/PremiumBanner';
import { ExpirationAlert } from '../components/ExpirationAlert';

export function Home() {
  const { receipts, loading } = useReceipts();

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  if (receipts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <PremiumBanner />
      <TotalValue />
      <ExpirationAlert />
      <div className="grid grid-cols-1 gap-4">
        <CategoryChart />
        <RecentWarranties />
      </div>
    </div>
  );
}