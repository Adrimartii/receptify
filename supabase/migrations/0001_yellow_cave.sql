/*
  # Create users table and authentication setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - References auth.users
      - `email` (text)
      - `first_name` (text)
      - `last_name` (text)
      - `subscription_tier` (text) - 'free' or 'premium'
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on users table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  email text NOT NULL,
  first_name text,
  last_name text,
  subscription_tier text DEFAULT 'free',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);