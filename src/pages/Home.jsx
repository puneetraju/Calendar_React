import React, { useState, useEffect } from "react";
import CalendarGrid from "../components/CalendarGrid";
import EventForm from "../components/EventForm";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Default to current day
  const [events, setEvents] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(events).length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setShowEventForm(true);
    setEventToEdit(null);
  };

  const handleSaveEvent = (event) => {
    const dateKey = selectedDate.format("YYYY-MM-DD");

    if (eventToEdit) {
      const updatedEvents = { ...events };
      const eventIndex = updatedEvents[dateKey].findIndex(
        (e) => e.eventName === eventToEdit.eventName
      );

      if (eventIndex !== -1) {
        updatedEvents[dateKey][eventIndex] = event;
        setEvents(updatedEvents);
      }
    } else {
      const updatedEvents = { ...events };
      updatedEvents[dateKey] = [...(updatedEvents[dateKey] || []), event];
      setEvents(updatedEvents);
    }

    setShowEventForm(false);
  };

  const handleEditEvent = (eventIndex) => {
    const dateKey = selectedDate.format("YYYY-MM-DD");
    const eventToEdit = events[dateKey][eventIndex];
    setEventToEdit(eventToEdit);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (eventIndex) => {
    const dateKey = selectedDate.format("YYYY-MM-DD");
    const updatedEvents = { ...events };

    updatedEvents[dateKey].splice(eventIndex, 1);

    if (updatedEvents[dateKey].length === 0) {
      delete updatedEvents[dateKey];
    }

    setEvents(updatedEvents);
  };

  return (
    <div className="flex p-4 gap-x-24">
      <div className="flex-3">
        <CalendarGrid
          onDayClick={handleDayClick}
          selectedDate={selectedDate}
          events={events} 
        />
      </div>

      <div className="flex-1 mr-6">
        <h3 className="text-4xl mb-4 pt-7">Events</h3>
        <div className="w-30 max-h-96 overflow-y-auto">
        {
  events[selectedDate?.format("YYYY-MM-DD")]?.length ? (
    events[selectedDate?.format("YYYY-MM-DD")]?.map((event, index) => (
      <div key={index} className="border-b pb-4 flex justify-between items-center">
        <div className="flex-1 pr-4 max-w-[250px]">
          <strong className="block truncate text-lg">{event.eventName}</strong>
          <p className="truncate text-sm text-gray-600">{event.description || "No description provided."}</p>
        </div>
        <div className="text-right">
          <p>{`${event.startTime} - ${event.endTime}`}</p>
          <div className="flex justify-end mt-2">
            <Button variant="secondary" onClick={() => handleEditEvent(index)} className="bg-yellow-500 h-8 mr-2">
              Edit
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteEvent(index)} className="h-8">
              Delete
            </Button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-xl text-gray-600 mt-4">No events for {selectedDate.format("MMM DD, YYYY")}</p>
  )
}

        </div>
      </div>

      {showEventForm && selectedDate && (
        <EventForm
          selectedDate={selectedDate}
          onSave={handleSaveEvent}
          onClose={() => setShowEventForm(false)}
          eventToEdit={eventToEdit}
        />
      )}
    </div>
  );
};

export default Home;
