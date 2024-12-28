export interface Receipt {
  id: string;
  user_id: string;
  product_name: string;
  category: string;
  purchase_date: string;
  expiry_date: string;
  price: number;
  image_url: string;
  created_at: string;
  deleted_at?: string;
  deletion_reason?: {
    type: 'sold' | 'discarded' | 'other';
    details?: string;
  };
}

export interface CreateReceiptDTO {
  product_name: string;
  category: string;
  purchase_date: string;
  expiry_date: string;
  price: number;
  image_url: string;
}