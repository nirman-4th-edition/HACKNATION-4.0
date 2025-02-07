import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar: React.FC = () => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const generateCalendarDays = () => {
    const calendarDays = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-8"></div>);
    }
    
    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today.getDate();
      const hasEvent = [5, 12, 15, 20].includes(day); // Example dates with events
      
      calendarDays.push(
        <div 
          key={day}
          className={`h-8 flex items-center justify-center relative ${
            isToday 
              ? 'bg-blue-500 text-white rounded-full' 
              : hasEvent 
                ? 'font-medium text-blue-600'
                : ''
          }`}
        >
          {day}
          {hasEvent && (
            <span className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full"></span>
          )}
        </div>
      );
    }
    
    return calendarDays;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={20} />
        </button>
        <span className="font-medium">
          {months[today.getMonth()]} {today.getFullYear()}
        </span>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;