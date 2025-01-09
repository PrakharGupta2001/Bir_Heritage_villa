import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingCalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onCheckInChange: (date: Date) => void;
  onCheckOutChange: (date: Date) => void;
  disabledDates?: Date[];
}

export default function BookingCalendar({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  disabledDates = []
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const isDateDisabled = (date: Date) => {
    return disabledDates.some(disabled =>
      disabled.getFullYear() === date.getFullYear() &&
      disabled.getMonth() === date.getMonth() &&
      disabled.getDate() === date.getDate()
    );
  };

  const isDateInRange = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    return date >= checkIn && date <= checkOut;
  };

  const isBetweenSelectedDates = (date: Date) => {
    return checkIn && checkOut && date > checkIn && date < checkOut;
  };

  const renderCalendarDays = () => {
    const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = isDateDisabled(date);
      const isSelected = isDateInRange(date);
      const isCheckIn = checkIn?.getDate() === day;
      const isCheckOut = checkOut?.getDate() === day;
      const isBetween = isBetweenSelectedDates(date);

      days.push(
        <button
          key={day}
          onClick={() => {
            if (!checkIn || (checkIn && checkOut)) {
              onCheckInChange(date);
              onCheckOutChange(null); // Reset check-out date when new check-in is selected
            } else if (date > checkIn) {
              onCheckOutChange(date);
            }
          }}
          disabled={isDisabled}
          className={`
            h-10 w-10 rounded-full flex items-center justify-center
            ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-amber-100'}
            ${isSelected ? 'bg-amber-800 text-white' : ''}
            ${isCheckIn || isCheckOut ? 'bg-amber-900 text-white' : ''}
            ${isBetween ? 'bg-yellow-200' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="font-medium">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
    </div>
  );
}
