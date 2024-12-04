﻿
import { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";

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
function TimeSlots({timeslots}) {

    async function makeBooking(userId, providerId, serviceId, timeSlotId) {
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    providerId,
                    serviceId,
                    timeSlotId
                }),
            });

            if (!response.ok) {
                throw new Error('Booking failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Error making booking:', error);
            throw error;
        }
    }

    return (
        <div>
            <h1>Timeslots</h1>
            <ul>
                {timeslots.map((timeslot) => (
                    <>
                    <li key={timeslot.timeslotId}>{timeslot.startTime} - {timeslot.endTime}</li>
                    <button>Book</button>
                    </>
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
  const {state} = useLocation()
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);


  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-2">
      <h3 className="text-lg font-semibold mb-2">{state.service.name}</h3>
      <p className="text-gray-600">{state.service.description}</p>
      <p className="text-gray-600">
        Duration: {state.service.duration} minutes, Price: ${state.service.price}
      </p>

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}