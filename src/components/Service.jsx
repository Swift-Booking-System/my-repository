import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * @typedef {Object} Timeslot
 * @property {string} timeslotId - The unique identifier of the timeslot, must be a UUID.
 * @property {string} providerId - The unique identifier of the provider, must be a UUID.
 * @property {string} startTime - The start time of the timeslot, must be a date-time string.
 * @property {string} endTime - The end time of the timeslot, must be a date-time string.
 */

/**
 * A component that displays a list of timeslots.
 *
 * @param {Object} props - The component props.
 * @param {Array<Timeslot>} timeslots - The list of timeslots to display.
 *
 * @returns {JSX.Element} The rendered component.
 */
function TimeSlots({ timeslots }) {
  async function makeBooking(userId, providerId, serviceId, timeSlotId) {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          providerId,
          serviceId,
          timeSlotId,
        }),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error making booking:", error);
      throw error;
    }
  }

  return (
    <div>
  <h1 className="mt-5 mb-2 text-xl font-bold">Timeslots</h1>
  <ul>
    {timeslots.map((timeslot) => (
      <li
        className="bg-white rounded-lg shadow-md p-4 m-2 flex justify-between items-center"
        key={timeslot.timeslotId}
      >
        <span>
          {timeslot.startTime} - {timeslot.endTime}
        </span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Book
        </button>
      </li>
    ))}
  </ul>
</div>

  );
}

/**
 * Service component that displays service details and handles booking.
 *
 * @param {Object} props - The properties for the service.
 * @param {string|number} props.id - The unique identifier for the service.
 * @param {string} props.name - The name of the service.
 * @param {string} props.description - A description of the service.
 * @param {number} props.duration - The duration of the service in minutes.
 * @param {number} props.price - The price of the service.
 *
 * @returns {JSX.Element} The rendered service component with booking functionality.
 */
export default function Service() {
  const { state } = useLocation();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [timeslots, setTimeslots] = useState([]);

  useEffect(() => {
    if (state) {
      setBooking(state.service);
    }
    function getTimeslots() {
      fetch(
        "https://localhost:7023/api/timeslots/available?serviceId=" +
          state.service.serviceId
      )
        .then((response) => response.json())
        .then((data) => {
          setTimeslots(data);
        });
    }
    getTimeslots();
  }, [state]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-2">
      <h3 className="text-lg font-semibold mb-2">{state.service.name}</h3>
      <p className="text-gray-600">{state.service.description}</p>
      <p className="text-gray-600">
        Duration: {state.service.duration} minutes, Price: $
        {state.service.price}
      </p>
      <TimeSlots timeslots={timeslots} />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
