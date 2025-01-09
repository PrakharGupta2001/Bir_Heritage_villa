import React from 'react';
import type { Room } from '../../types';

interface BookingSummaryProps {
  room: Room | null;
  checkIn: Date;
  checkOut: Date;
  guestInfo: {
    fullName: string;
    email: string;
    phone: string;
    adults: number;
    children: number;
    specialRequests: string;
  };
}

export default function BookingSummary({ room, checkIn, checkOut, guestInfo }: BookingSummaryProps) {
  if (!room) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Room information not available
      </div>
    );
  }

  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  const roomTotal = nights * room.rate;
  const tax = roomTotal * 0.18; // 18% tax
  const total = roomTotal + tax;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
        
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between">
            <div>
              <h4 className="font-medium">{room.name}</h4>
              <p className="text-sm text-gray-600">{room.category}</p>
            </div>
            {room.images?.[0] && (
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Check-in</p>
                <p className="font-medium">{checkIn.toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Check-out</p>
                <p className="font-medium">{checkOut.toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Guests</p>
                <p className="font-medium">
                  {guestInfo.adults} Adults{guestInfo.children > 0 && `, ${guestInfo.children} Children`}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-medium">{nights} {nights === 1 ? 'Night' : 'Nights'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Price Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Room Rate (₹{room.rate} × {nights} nights)</span>
            <span>₹{roomTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Taxes (18%)</span>
            <span>₹{tax}</span>
          </div>
          <div className="flex justify-between font-medium text-lg pt-2 border-t">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Guest Details</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-gray-600">Name:</span> {guestInfo.fullName}
          </p>
          <p>
            <span className="text-gray-600">Email:</span> {guestInfo.email}
          </p>
          <p>
            <span className="text-gray-600">Phone:</span> {guestInfo.phone}
          </p>
          {guestInfo.specialRequests && (
            <div>
              <span className="text-gray-600">Special Requests:</span>
              <p className="mt-1">{guestInfo.specialRequests}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}