import React from 'react';
import { ArrowDownAZ, ArrowUpAZ, Calendar, Euro } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../constants/categories';

type SortOption = 'date-asc' | 'date-desc' | 'price-asc' | 'price-desc' | 'expiry-asc' | 'expiry-desc';

interface WarrantyFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function WarrantyFilters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: WarrantyFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 text-sm"
      >
        <option value="">Toutes les catégories</option>
        {PRODUCT_CATEGORIES.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          onClick={() => onSortChange(sortBy === 'date-desc' ? 'date-asc' : 'date-desc')}
          className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm ${
            sortBy.startsWith('date')
              ? 'border-brand-500 text-brand-600 bg-brand-50'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Calendar className="h-4 w-4 mr-1" />
          Date d'achat
          {sortBy === 'date-asc' && <ArrowUpAZ className="h-4 w-4 ml-1" />}
          {sortBy === 'date-desc' && <ArrowDownAZ className="h-4 w-4 ml-1" />}
        </button>

        <button
          onClick={() => onSortChange(sortBy === 'price-desc' ? 'price-asc' : 'price-desc')}
          className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm ${
            sortBy.startsWith('price')
              ? 'border-brand-500 text-brand-600 bg-brand-50'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Euro className="h-4 w-4 mr-1" />
          Prix
          {sortBy === 'price-asc' && <ArrowUpAZ className="h-4 w-4 ml-1" />}
          {sortBy === 'price-desc' && <ArrowDownAZ className="h-4 w-4 ml-1" />}
        </button>

        <button
          onClick={() => onSortChange(sortBy === 'expiry-desc' ? 'expiry-asc' : 'expiry-desc')}
          className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm ${
            sortBy.startsWith('expiry')
              ? 'border-brand-500 text-brand-600 bg-brand-50'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Calendar className="h-4 w-4 mr-1" />
          Date d'expiration
          {sortBy === 'expiry-asc' && <ArrowUpAZ className="h-4 w-4 ml-1" />}
          {sortBy === 'expiry-desc' && <ArrowDownAZ className="h-4 w-4 ml-1" />}
        </button>
      </div>
    </div>
  );
}