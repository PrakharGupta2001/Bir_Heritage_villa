import React from 'react';
import { Star, Award, Clock, Users } from 'lucide-react';

const stats = [
  { icon: Star, value: '4.9', label: 'Guest Rating' },
  { icon: Award, value: '25+', label: 'Years of Excellence' },
  { icon: Clock, value: '24/7', label: 'Service' },
  { icon: Users, value: '10k+', label: 'Happy Guests' }
];

export default function About() {
  return (
    <section id="about" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif">Our Heritage Story</h2>
            <p className="text-gray-600">
              Since 1998, BH Villa has been a symbol of luxury and heritage hospitality. 
              Housed in a restored palace, our hotel combines traditional architecture 
              with modern amenities to create an unforgettable experience.
            </p>
            <p className="text-gray-600">
              Each room tells a story, decorated with period furniture and local artworks, 
              while offering all the comforts of a luxury hotel. Our commitment to 
              personalized service ensures every guest feels like royalty.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <Icon className="w-6 h-6 text-amber-800 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-amber-800">{value}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80"
              alt="Hotel exterior"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1615460549969-36fa19521a4f?auto=format&fit=crop&q=80"
              alt="Hotel interior"
              className="rounded-lg w-full h-64 object-cover mt-8"
            />
            <img
              src="https://images.unsplash.com/photo-1637999982092-9bb8f2e6bf42?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hotel View"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1663091623131-0e56c6e3f325?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFyYWdsaWRpbmclMjBpbiUyMGluZGlhfGVufDB8fDB8fHww"
              alt="Hotel fun"
              className="rounded-lg w-full h-64 object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}