import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Ruler, Wifi, Tv, Coffee, Wind, Martini, Grid2x2, Waves, Bath } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { Room } from '../../types';
import BookingForm from './BookingForm';
import AuthModal from '../auth/AuthModal';

interface RoomDetailProps {
  room: Room;
  onBack: () => void;
}

export default function RoomDetail({ room, onBack }: RoomDetailProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const handleBookNow = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowBookingForm(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-amber-800 hover:text-amber-900 mb-6"
      >
        <ChevronLeft size={20} />
        <span>Back to Rooms</span>
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <img
              src={room.images[currentImageIndex]}
              alt={`${room.name} - View ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Room Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-serif mb-2">{room.name}</h1>
            <p className="text-gray-600">{room.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Users className="text-amber-800" />
              <span>Up to {room.occupancy} guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="text-amber-800" />
              <span>{room.size}m²</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  {amenity.includes('WiFi') && <Wifi className="text-amber-800" />}
                  {amenity.includes('TV') && <Tv className="text-amber-800" />}
                  {amenity.includes('Coffee') && <Coffee className="text-amber-800" />}
                  {amenity.includes('AC') && <Wind className="text-amber-800" />}
                  {amenity.includes('Mini Bar') && <Martini className="text-amber-800" />}
                  {amenity.includes('Private Pool') && <Waves className="text-amber-800" />}
                  {amenity.includes('Jacuzzi') && <Bath className="text-amber-800" />}
                  {amenity.includes('Private Balcony') && <Grid2x2 className="text-amber-800" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-2xl font-bold">₹{room.rate}</span>
                <span className="text-gray-600">/night</span>
              </div>
              <button
                onClick={handleBookNow}
                className="bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowBookingForm(true)}
        />
      )}

      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <BookingForm
              room={room}
              onSuccess={() => {
                setShowBookingForm(false);
                // Handle success
              }}
              onCancel={() => setShowBookingForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
