import React, { useState } from 'react';
import { Calendar, CreditCard, User, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import type { Room } from '../../types';
import BookingCalendar from './BookingCalendar';
import BookingSummary from './BookingSummary';

interface BookingFormProps {
  room: Room;
  onSuccess: () => void;
  onCancel: () => void;
}

type Step = 'guest-info' | 'dates' | 'payment';

interface GuestInfo {
  fullName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  specialRequests: string;
}

export default function BookingForm({ room, onSuccess, onCancel }: BookingFormProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>('guest-info');
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    fullName: '',
    email: user?.email || '',
    phone: '',
    adults: 1,
    children: 0,
    specialRequests: ''
  });
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateGuestInfo = () => {
    const newErrors: Record<string, string> = {};
    
    if (!guestInfo.fullName) newErrors.fullName = 'Full name is required';
    if (!guestInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(guestInfo.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!guestInfo.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(guestInfo.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (guestInfo.adults + guestInfo.children > room.occupancy) {
      newErrors.guests = `Maximum ${room.occupancy} guests allowed`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDates = () => {
    const newErrors: Record<string, string> = {};
    
    if (!checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!checkOut) newErrors.checkOut = 'Check-out date is required';
    if (checkIn && checkOut) {
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      if (nights < 1) newErrors.dates = 'Minimum one night stay required';
      if (nights > 30) newErrors.dates = 'Maximum 30 nights stay allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
  if (!user || !checkIn || !checkOut) return;

  setLoading(true);
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  const totalAmount = nights * room.rate;

  try {
    // Insert booking data into the database
    const { error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        room_id: room.id,
        check_in: checkIn.toISOString(),
        check_out: checkOut.toISOString(),
        guests: guestInfo.adults + guestInfo.children,
        adults: guestInfo.adults,
        children: guestInfo.children,
        full_name: guestInfo.fullName,
        phone: guestInfo.phone,
        email: guestInfo.email,
        total_amount: totalAmount,
        special_requests: guestInfo.specialRequests || null,
      });

    if (bookingError) throw bookingError;
    onSuccess();
  } catch (err) {
    setErrors({ submit: err instanceof Error ? err.message : 'Failed to create booking' });
  } finally {
    setLoading(false);
  }
};

  const renderStepContent = () => {
    switch (currentStep) {
      case 'guest-info':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={guestInfo.fullName}
                onChange={(e) => setGuestInfo({ ...guestInfo, fullName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={guestInfo.email}
                onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={guestInfo.phone}
                onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                placeholder="+91 1234567890"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Adults</label>
                <select
                  value={guestInfo.adults}
                  onChange={(e) => setGuestInfo({ ...guestInfo, adults: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                >
                  {[...Array(room.occupancy)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Children</label>
                <select
                  value={guestInfo.children}
                  onChange={(e) => setGuestInfo({ ...guestInfo, children: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                >
                  {[...Array(room.occupancy)].map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>
            {errors.guests && <p className="text-red-600 text-sm">{errors.guests}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700">Special Requests</label>
              <textarea
                value={guestInfo.specialRequests}
                onChange={(e) => setGuestInfo({ ...guestInfo, specialRequests: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>
        );

      case 'dates':
        return (
          <div className="space-y-4">
            <BookingCalendar
              checkIn={checkIn}
              checkOut={checkOut}
              onCheckInChange={setCheckIn}
              onCheckOutChange={setCheckOut}
            />
            {errors.dates && <p className="text-red-600 text-sm">{errors.dates}</p>}
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <BookingSummary
              room={room}
              checkIn={checkIn!}
              checkOut={checkOut!}
              guestInfo={guestInfo}
            />
            
            <div className="border-t pt-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-amber-800 focus:ring-amber-500" />
                <span className="text-sm text-gray-600">
                  I agree to the terms and conditions
                </span>
              </label>
            </div>

            {errors.submit && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md">
                {errors.submit}
              </div>
            )}
          </div>
        );
    }
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'guest-info':
        if (validateGuestInfo()) setCurrentStep('dates');
        break;
      case 'dates':
        if (validateDates()) setCurrentStep('payment');
        break;
      case 'payment':
        handleSubmit();
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'guest-info' ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-800'
          }`}>
            <User size={18} />
          </div>
          <div className="ml-2">Guest Info</div>
        </div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'dates' ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-800'
          }`}>
            <Calendar size={18} />
          </div>
          <div className="ml-2">Dates</div>
        </div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'payment' ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-800'
          }`}>
            <CreditCard size={18} />
          </div>
          <div className="ml-2">Payment</div>
        </div>
      </div>

      {renderStepContent()}

      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          disabled={loading}
          className="flex items-center gap-2 bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900 transition-colors disabled:opacity-50"
        >
          {loading ? (
            'Processing...'
          ) : (
            <>
              {currentStep === 'payment' ? 'Confirm Booking' : 'Next'}
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}