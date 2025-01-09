export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: string
          category: string
          name: string
          size: number
          occupancy: number
          rate: number
          description: string
          amenities: string[]
          images: string[]
          is_available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          name: string
          size: number
          occupancy: number
          rate: number
          description: string
          amenities?: string[]
          images?: string[]
          is_available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          category?: string
          name?: string
          size?: number
          occupancy?: number
          rate?: number
          description?: string
          amenities?: string[]
          images?: string[]
          is_available?: boolean
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          room_id: string
          check_in: string
          check_out: string
          guests: number
          total_amount: number
          status: string
          special_requests: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          room_id: string
          check_in: string
          check_out: string
          guests: number
          total_amount: number
          status?: string
          special_requests?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          room_id?: string
          check_in?: string
          check_out?: string
          guests?: number
          total_amount?: number
          status?: string
          special_requests?: string | null
          created_at?: string
        }
      }
      guest_information: {    // New Table: guest_information
        Row: {
          id: string
          booking_id: string
          full_name: string
          email: string
          phone: string
          adults: number
          children: number
          special_requests: string | null
        }
        Insert: {
          id?: string
          booking_id: string
          full_name: string
          email: string
          phone: string
          adults: number
          children: number
          special_requests?: string | null
        }
        Update: {
          id?: string
          booking_id?: string
          full_name?: string
          email?: string
          phone?: string
          adults?: number
          children?: number
          special_requests?: string | null
        }
      }
    }
  }
}
