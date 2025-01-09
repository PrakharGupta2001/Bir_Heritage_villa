/*
  # Create bookings table and policies
  
  1. Tables
    - bookings: Track guest reservations
  2. Security
    - RLS enabled
    - User-specific access policies
*/

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  room_id uuid REFERENCES rooms NOT NULL,
  check_in timestamptz NOT NULL,
  check_out timestamptz NOT NULL,
  guests integer NOT NULL,
  adults integer NOT NULL DEFAULT 1,
  children integer NOT NULL DEFAULT 0,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  total_amount decimal NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  special_requests text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create bookings policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can create their own bookings" ON bookings;
  CREATE POLICY "Users can create their own bookings"
    ON bookings FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

  DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
  CREATE POLICY "Users can view their own bookings"
    ON bookings FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);
END $$;