import React, { useState, useEffect } from 'react';
import { User, History, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Booking } from '../../types';
import BookingSummary from '../booking/BookingSummary';

export default function UserProfile() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'settings'>('bookings');

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            room:rooms (
              id,
              name,
              category,
              images,
              rate,
              occupancy,
              size,
              description,
              amenities,
              is_available
            )
          `)
          .eq('user_id', user.id)
          .order('check_in', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-amber-800 text-white p-6">
          <div className="flex items-center gap-4">
            <div className="bg-amber-700 p-3 rounded-full">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-serif">{user.email}</h2>
              <p className="text-amber-200">Member since {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-2 px-6 py-4 ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-amber-800 text-amber-800'
                  : 'text-gray-500 hover:text-amber-800'
              }`}
            >
              <History size={20} />
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-6 py-4 ${
                activeTab === 'settings'
                  ? 'border-b-2 border-amber-800 text-amber-800'
                  : 'text-gray-500 hover:text-amber-800'
              }`}
            >
              <Settings size={20} />
              Settings
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'bookings' ? (
            <div className="space-y-6">
              <h3 className="text-xl font-medium">Your Bookings</h3>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-gray-100 h-32 rounded-lg" />
                  ))}
                </div>
              ) : bookings.length > 0 ? (
                <div className="grid gap-6">
                  {bookings.map((booking) => {
                    const { room, check_in, check_out, full_name, email, phone, adults, children, special_requests } = booking;
                    return (
                      <div key={booking.id} className="space-y-6">
                        <BookingSummary
                          room={room || null}
                          checkIn={new Date(check_in)}
                          checkOut={new Date(check_out)}
                          guestInfo={{
                            fullName: full_name || 'N/A',
                            email: email || 'N/A',
                            phone: phone || 'N/A',
                            adults: adults || 0,
                            children: children || 0,
                            specialRequests: special_requests || 'N/A',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No bookings found.</p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-medium">Account Settings</h3>
              <div className="max-w-md">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                    />
                  </div>
                  <button
                    onClick={() => {/* Add password change logic */}}
                    className="w-full bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}