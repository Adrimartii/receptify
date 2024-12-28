/*
  # Add phone field to users table
  
  1. Changes
    - Add phone field to users table with validation
    
  2. Security
    - Keep existing RLS policies
    - Add check constraint for valid phone numbers
*/

-- Add phone column with validation
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone text;

-- Add check constraint for valid phone numbers
ALTER TABLE users ADD CONSTRAINT valid_phone_format 
  CHECK (phone IS NULL OR phone ~ '^\+?[0-9\s-]{10,}$');