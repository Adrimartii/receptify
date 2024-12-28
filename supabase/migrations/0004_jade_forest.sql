/*
  # Fix authentication policies

  1. Changes
    - Drop all existing policies
    - Create new simplified policies for user management
    
  2. Security
    - Allow authenticated users to read and update their own data
    - Allow creation of new users during signup
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable insert for signup" ON users;

-- Create new simplified policies
CREATE POLICY "Enable read access for authenticated users"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Enable update access for users"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable insert access for all"
  ON users FOR INSERT
  WITH CHECK (true);