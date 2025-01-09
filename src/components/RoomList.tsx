import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Room } from '../types';
import { supabase } from '../lib/supabase';

const RoomCard = ({ room, onBook }: { room: Room; onBook: (room: Room) => void }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
    <div className="relative h-64">
      <img
        src={room.images[0]}
        alt={room.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            room.isAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {room.isAvailable ? 'Available' : 'Booked'}
        </span>
      </div>
    </div>

    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-serif">{room.name}</h3>
        <p className="text-amber-800 font-semibold">₹{room.rate}/night</p>
      </div>

      <p className="text-gray-600 mb-4">{room.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {room.amenities.slice(0, 3).map((amenity, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm"
          >
            {amenity}
          </span>
        ))}
        {room.amenities.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
            +{room.amenities.length - 3} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-current" />
          <span className="text-gray-600">
            {room.size}m² • Up to {room.occupancy} guests
          </span>
        </div>
        <button
          className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!room.isAvailable}
          onClick={() => onBook(room)}
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
);

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .in('category', ['Deluxe', 'Suite', 'Heritage Suite', 'Royal Suite', 'Presidential Suite'])
          .order('category', { ascending: true });

        if (error) throw error;

        const uniqueRooms = data.reduce((acc: Room[], room: Room) => {
          const exists = acc.some((item) => item.category === room.category);
          if (!exists) {
            acc.push({
              ...room,
              isAvailable: room.is_available,
            });
          }
          return acc;
        }, []);

        setRooms(uniqueRooms);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleBookNow = (room: Room) => {
    navigate('/book', { state: { room } });
  };

  if (loading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif mb-8 text-center">Our Luxurious Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onBook={handleBookNow} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomList;