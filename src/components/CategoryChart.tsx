import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useReceipts } from '../hooks/useReceipts';
import { useTheme } from '../context/ThemeContext';
import { PRODUCT_CATEGORIES } from '../constants/categories';

ChartJS.register(ArcElement, Tooltip, Legend);

export function CategoryChart() {
  const { receipts } = useReceipts();
  const { hideValues } = useTheme();

  const categoryData = PRODUCT_CATEGORIES.map(category => ({
    category: category.label,
    count: receipts.filter(w => w.category === category.id).length,
    value: receipts
      .filter(w => w.category === category.id)
      .reduce((sum, w) => sum + (w.price || 0), 0)
  })).filter(item => item.count > 0);

  const data = {
    labels: categoryData.map(item => item.category),
    datasets: [
      {
        data: categoryData.map(item => item.count),
        backgroundColor: [
          '#4F46E5', // indigo-600
          '#7C3AED', // violet-600
          '#EC4899', // pink-600
          '#EF4444', // red-600
          '#F59E0B', // amber-600
          '#10B981', // emerald-600
          '#3B82F6', // blue-600
          '#6366F1', // indigo-500
          '#8B5CF6', // violet-500
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = categoryData[context.dataIndex].value;
            const count = categoryData[context.dataIndex].count;
            const label = context.label || '';
            
            if (hideValues) {
              return `${label}: ${count} article${count > 1 ? 's' : ''} (••••)`;
            }
            
            return `${label}: ${count} article${count > 1 ? 's' : ''} (${value.toLocaleString('fr-FR')} €)`;
          }
        }
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-base font-medium text-gray-900 mb-3">
        Répartition par catégorie
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
}