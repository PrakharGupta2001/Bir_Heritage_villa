import React from 'react';
import { Wifi, Coffee, Dumbbell, Utensils, Car, Tv, Wind, Plane } from 'lucide-react';

const amenities = [
  {
    icon: Wifi,
    name: 'Free Wi-Fi',
    description: 'Enjoy high-speed internet throughout the property, allowing you to stay connected with ease.',
    image: '/images/wifi.jpg', // Use the path from the public folder
  },
  {
    icon: Coffee,
    name: 'Breakfast',
    description: 'Indulge in a complimentary breakfast buffet, offering a variety of healthy and delicious options to start your day.',
    image: '/images/breakfast.jpg', // Use the path from the public folder
  },
  {
    icon: Dumbbell,
    name: 'Fitness Center',
    description: 'Access our fully equipped, 24/7 fitness center to keep up with your workout routine while on vacation.',
    image: '/images/gym.jpg', // Use the path from the public folder
  },
  {
    icon: Utensils,
    name: 'Restaurant',
    description: 'Experience a fine dining experience with a variety of exquisite dishes made from locally sourced ingredients.',
    image: '/images/restaurant.jpg', // Use the path from the public folder
  },
  {
    icon: Car,
    name: 'Valet Parking',
    description: 'Take advantage of our secure valet parking service, ensuring the safety and convenience of your vehicle.',
    image: '/images/parking.jpg', // Use the path from the public folder
  },
  {
    icon: Tv,
    name: 'Smart TVs',
    description: 'Enjoy premium entertainment with Smart TVs in every room, equipped with a wide range of channels and streaming services.',
    image: '/images/smarttv.jpg', // Use the path from the public folder
  },
  {
    icon: Wind,
    name: 'Climate Control',
    description: 'Relax in the perfect room temperature with individually controlled air conditioning and heating.',
    image: '/images/green.jpg', // Use the path from the public folder
  },
  {
    icon: Plane,
    name: 'Paragliding',
    description: 'For adventure seekers, we offer thrilling paragliding experiences that provide breathtaking aerial views of the surrounding area.',
    image: '/images/para.jpg', // Use the path from the public folder
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-16 px-4 bg-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif mb-4">Hotel Amenities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience luxury and comfort with our comprehensive range of amenities. Whether you're here to relax or indulge in exciting activities, we have something special for every guest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map(({ icon: Icon, name, description, image }) => (
            <div
              key={name}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Display image */}
              <div className="w-full h-40 bg-cover rounded-lg mb-4" style={{ backgroundImage: `url(${image})` }}></div>
              {/* Display icon */}
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="font-medium mb-2">{name}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}