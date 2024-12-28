/*
  # Fix user creation policies

  1. Changes
    - Drop existing RLS policies
    - Add new policies with correct permissions
    - Enable unauthenticated access for user creation
  
  2. Security
    - Users can read and update their own data
    - Allow public access for user creation during signup
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON users;

-- Create new policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable insert for signup"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);