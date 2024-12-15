import React, { useState, useEffect } from "react";
import { getDaysInMonth, getMonthYear } from "../utils/calendarLogic";
import dayjs from "dayjs";

const CalendarGrid = ({ onDayClick, selectedDate, events }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [isFormVisible, setFormVisible] = useState(false); // Track form visibility

  const { month, year } = getMonthYear(currentDate);
  const days = getDaysInMonth(currentDate.format("MM"), currentDate.format("YYYY"));

  // Update current time every second for live changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const handlePreviousMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  
  const getDayContent = (day) => {
    if (!day) return null; // No day

    const dateKey = day.format("YYYY-MM-DD");
    const hasEvents = events[dateKey] && events[dateKey].length > 0;
  
    return (
      <>

        <span className="absolute top-1 right-1 text-lg">{day.format("D")}</span>

        {hasEvents && (
          <div
            className="absolute w-3 h-3 bg-red-500 rounded-full"
            style={{ top: "60%", left: "50%", transform: "translate(-50%, -50%)" }}
            title="This day has events"
          ></div>
        )}
      </>
    );
  };
  


  const getDayBackgroundStyle = (day) => {
    if (!day) return {}; // Empty day

    const isToday = day.isSame(dayjs(), "day");
    if (isToday) {
      const hours = currentTime.hour();
      const lightness = Math.max(0.2, 1 - hours / 24); 
      const backgroundColor = `hsl(200, 100%, ${lightness * 100}%)`; // Light blue shade

      const calculateLuminance = (hsl) => {
        const [h, s, l] = hsl.match(/\d+/g).map(Number);
        return l;
      };

      const luminance = calculateLuminance(backgroundColor);

      const textColor = luminance < 50 ? "white" : "black"; // Dynamic text color

      return { 
        backgroundColor, 
        color: textColor // Set dynamic text color
      };
    }

    return {};
  };

  const handleDayClick = (day) => {
    onDayClick(day);  // Pass the day to the parent component
    setFormVisible(true);  // Show the form on click
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePreviousMonth} className="btn w-32">
          Previous
        </button>
        <h2 className="text-lg font-bold text-center flex-grow mx-2">{`${month} ${year}`}</h2>
        <button onClick={handleNextMonth} className="btn w-32">
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-3xl text-center">{day}</div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            className={`border w-16 h-16 p-6 rounded text-center cursor-pointer hover:border-4 hover:border-blue-500 relative 
              ${day ? `day-${day.format("DD")}` : ""} 
              ${day && selectedDate && selectedDate.isSame(day, "day") && !isFormVisible ? "border-4 border-blue-500" : ""} 
              ${day === null ? "bg-grey" : ""}`}
            style={getDayBackgroundStyle(day)}
            onClick={day ? () => handleDayClick(day) : undefined}
          >
            {/* {day && <span className="absolute top-1 right-1 text-l">{day.format("D")}</span>} */}
            {day && getDayContent(day)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
