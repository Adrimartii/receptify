/*
  # Fix unique constraints and policies

  1. Changes
    - Add unique constraint on email
    - Update insert policy to prevent duplicates
    
  2. Security
    - Ensure email uniqueness
    - Maintain existing RLS policies
*/

-- Add unique constraint on email if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'users_email_key'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);
  END IF;
END $$;

-- Update insert policy to prevent duplicates
DROP POLICY IF EXISTS "Enable insert access for all" ON users;

CREATE POLICY "Enable insert access for all"
  ON users FOR INSERT
  WITH CHECK (
    NOT EXISTS (
      SELECT 1 FROM users 
      WHERE users.email = email
    )
  );