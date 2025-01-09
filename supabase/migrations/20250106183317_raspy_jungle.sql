/*
  # Create rooms table and policies
  
  1. Tables
    - rooms: Store room information and availability
  2. Security
    - RLS enabled
    - Public read access policy
*/

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  size integer NOT NULL,
  occupancy integer NOT NULL,
  rate decimal NOT NULL,
  description text NOT NULL,
  amenities text[] NOT NULL DEFAULT '{}',
  images text[] NOT NULL DEFAULT '{}',
  is_available boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on rooms
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Create rooms policy
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can view rooms" ON rooms;
  CREATE POLICY "Anyone can view rooms"
    ON rooms FOR SELECT
    TO authenticated, anon
    USING (true);
END $$;

