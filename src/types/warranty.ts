export interface Warranty {
  id: string;
  productName: string;
  category: string;
  purchaseDate: string;
  price: number;
  expiryDate: string;
  imageUrl: string;
  deletionReason?: {
    type: 'sold' | 'discarded' | 'other';
    details?: string;
  };
  deleted?: boolean;
  extendedWarranty?: {
    enabled: boolean;
    duration: number; // in months
  };
}