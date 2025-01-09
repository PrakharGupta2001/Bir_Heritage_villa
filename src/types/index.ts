export interface Room {
  id: string;
  category: 'Deluxe' | 'Suite' | 'Heritage Suite' | 'Royal Suite' | 'Presidential Suite';
  name: string;
  size: number;
  occupancy: number;
  rate: number;
  description: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface GuestInformation {
  id: string;
  bookingId: string;
  fullName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  specialRequests?: string;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  guestInformation?: GuestInformation[]; // Nested relationship
}
