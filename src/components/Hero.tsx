import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleButtonClick = () => {
    navigate('/rooms'); // Navigate to the RoomList route
  };

  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            Bir Heritage Villa
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Immerse yourself in the grandeur of a bygone era with modern luxuries
          </p>
          <button
            onClick={handleButtonClick} // Attach click handler
            className="group bg-amber-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-amber-900 transition-all duration-300 transform hover:scale-105"
          >
            Book Your Stay
            <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
