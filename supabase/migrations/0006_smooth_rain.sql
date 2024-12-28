/*
  # Add receipts management

  1. New Tables
    - `receipts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `product_name` (text)
      - `category` (text)
      - `purchase_date` (date)
      - `expiry_date` (date)
      - `price` (decimal)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `deleted_at` (timestamptz, null by default)
      - `deletion_reason` (jsonb, null by default)

  2. Security
    - Enable RLS on `receipts` table
    - Add policies for CRUD operations
    - Create storage bucket for receipt images
*/

-- Create receipts table
CREATE TABLE IF NOT EXISTS receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  product_name text NOT NULL,
  category text NOT NULL,
  purchase_date date NOT NULL,
  expiry_date date NOT NULL,
  price decimal(10,2),
  image_url text,
  created_at timestamptz DEFAULT now(),
  deleted_at timestamptz,
  deletion_reason jsonb,
  CONSTRAINT valid_dates CHECK (expiry_date >= purchase_date)
);

-- Enable RLS
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

-- Policies for receipts
CREATE POLICY "Users can view own receipts"
  ON receipts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own receipts"
  ON receipts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own receipts"
  ON receipts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own receipts"
  ON receipts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX receipts_user_id_idx ON receipts(user_id);
CREATE INDEX receipts_purchase_date_idx ON receipts(purchase_date);
CREATE INDEX receipts_expiry_date_idx ON receipts(expiry_date);

-- Create storage bucket for receipt images
INSERT INTO storage.buckets (id, name, public)
VALUES ('receipts', 'receipts', false);

-- Storage policies
CREATE POLICY "Users can view own receipt images"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'receipts' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can upload own receipt images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'receipts' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete own receipt images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'receipts' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );