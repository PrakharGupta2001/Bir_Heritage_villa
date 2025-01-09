/*
  # Add Guest Information Table and Relationships

  1. New Tables
    - `guest_information`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, foreign key to bookings)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `adults` (integer)
      - `children` (integer)
      - `special_requests` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `guest_information` table
    - Add policy for authenticated users to read their own guest information
*/

-- Create guest_information table
CREATE TABLE IF NOT EXISTS guest_information (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  adults integer NOT NULL DEFAULT 1,
  children integer NOT NULL DEFAULT 0,
  special_requests text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE guest_information ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view their own guest information" ON guest_information;
  CREATE POLICY "Users can view their own guest information"
    ON guest_information FOR SELECT
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM bookings
        WHERE bookings.id = guest_information.booking_id
        AND bookings.user_id = auth.uid()
      )
    );

  DROP POLICY IF EXISTS "Users can create guest information for their bookings" ON guest_information;
  CREATE POLICY "Users can create guest information for their bookings"
    ON guest_information FOR INSERT
    TO authenticated
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM bookings
        WHERE bookings.id = guest_information.booking_id
        AND bookings.user_id = auth.uid()
      )
    );
END $$;