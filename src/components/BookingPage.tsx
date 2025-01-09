import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoomDetail from './booking/RoomDetail';

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;

  if (!room) {
    return navigate('/rooms');
  }

  return (
    <div className="pt-16">
      <RoomDetail room={room} onBack={() => navigate('/rooms')} />
    </div>
  );
}