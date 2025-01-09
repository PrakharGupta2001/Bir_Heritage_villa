import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-serif mb-4">
              <span className="bg-amber-800 text-white px-3 py-1 rounded-lg">BH</span>
              <span className="ml-2 text-amber-500">Villa</span>
            </div>
            <p className="text-sm">
              Experience luxury and heritage in the heart of the city. Your perfect getaway destination.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-amber-500">
                <Phone size={18} />
                <span>+91 123 456 7890</span>
              </a>
              <a href="mailto:info@bhvilla.com" className="flex items-center gap-2 hover:text-amber-500">
                <Mail size={18} />
                <span>info@bhvilla.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>123 Heritage Lane, City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-amber-500">About Us</a>
              </li>
              <li>
                <a href="/rooms" className="hover:text-amber-500">Our Rooms</a>
              </li>
              <li>
                <a href="/amenities" className="hover:text-amber-500">Amenities</a>
              </li>
              <li>
                <a href="/contacst" className="hover:text-amber-500">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-medium mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-500">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-amber-500">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-amber-500">
                <Instagram size={24} />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Bir Heritage Villa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}