/*
  # Add INSERT policy for users table
  
  1. Changes
    - Add INSERT policy to allow users to create their own profile
  
  2. Security
    - New policy allows authenticated users to insert their own data
*/

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);