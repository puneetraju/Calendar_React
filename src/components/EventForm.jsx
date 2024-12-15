import React, { useState, useEffect } from "react";

const EventForm = ({ selectedDate, onSave, onClose, eventToEdit }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.eventName);
      setStartTime(eventToEdit.startTime);
      setEndTime(eventToEdit.endTime);
      setDescription(eventToEdit.description);
    }
  }, [eventToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = { eventName, startTime, endTime, description };
    onSave(event); // Save event in the parent component (Home)
    setEventName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg w-96">
        <h3 className="text-xl mb-4">
          {eventToEdit
            ? `Edit Event for ${selectedDate.format("MMM DD, YYYY")}`
            : `Add Event for ${selectedDate.format("MMM DD, YYYY")}`}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Name"
            className="border p-2 w-full mt-2"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <input
            type="time"
            className="border p-2 w-full mt-2"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <input
            type="time"
            className="border p-2 w-full mt-2"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full mt-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-4">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              {eventToEdit ? "Save Changes" : "Save Event"}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded ml-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
