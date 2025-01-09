import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import RoomList from './components/RoomList';
import Amenities from './components/Amenities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UserProfile from './components/profile/UserProfile';
import BookingPage from './components/BookingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                </>
              }
            />

            {/* Profile Route */}
            <Route path="/profile" element={<UserProfile />} />

            {/* Amenities Route */}
            <Route path="/amenities" element={<Amenities />} />

            {/* Contacts Route */}
            <Route path="/contacts" element={<Contact />} />

            {/* Rooms Route */}
            <Route path="/rooms" element={<RoomList />} />

            {/* Booking Route */}
            <Route path="/book" element={<BookingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
