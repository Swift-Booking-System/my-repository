import {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

/**
 * @typedef {Object} Timeslot
 * @property {string} timeSlotId - The unique identifier of the timeslot, must be a UUID.
 * @property {string} providerId - The unique identifier of the provider, must be a UUID.
 * @property {string} startTime - The start time of the timeslot, must be a date-time string.
 * @property {string} endTime - The end time of the timeslot, must be a date-time string.
 */

function formatTime(dateString) {
  const date = new Date(dateString);
  const options = { hour: "numeric", minute: "numeric" };
  return date.toLocaleTimeString("en-MY", options);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-MY", options);
}

/**
 * A component that displays a list of timeslots.
 *
 * @param {Object} props - The component props.
 * @param {Array<Timeslot>} timeslots - The list of timeslots to display.
 *
 * @returns {JSX.Element} The rendered component.
 */
function TimeSlots({ timeslots ,service}) {
  const [activeFormId, setActiveFormId] = useState(null);

  async function makeBooking(userId, providerId, serviceId, timeSlotId,name, phoneNumber) {
    try {
      const response = await fetch("https://localhost:7023/api/Bookings?name=" + name + "&phoneNumber=" + phoneNumber, {
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

  const handleBooking = async (e, timeslot) => {
    e.preventDefault();
    const form = e.target;
    const userId = null;
    const name = form.name.value;
    const phoneNumber = form.phoneNumber.value;

    if (name && phoneNumber) {
      try {
        await makeBooking(
            userId,
            timeslot.providerId,
            service.serviceId,
            timeslot.timeSlotId,
            name,
            phoneNumber
        );
        alert("Booking successful!");
        setActiveFormId(null);
        window.location.reload();
      } catch (error) {
        alert("Booking failed. Please try again.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Available Timeslots</h1>
        <ul className="space-y-4">
          {timeslots.map((timeslot) => (
              <li
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
                  key={timeslot.timeSlotId}
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{formatDate(timeslot.startTime)}</span>
                    <span className="text-gray-600">{formatTime(timeslot.startTime)} - {formatTime(timeslot.endTime)}</span>
                  </div>

                  <button
                      className={`px-4 py-2 rounded transition-colors duration-200 ${
                          activeFormId === timeslot.timeSlotId
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                      onClick={() => setActiveFormId(activeFormId === timeslot.timeSlotId ? null : timeslot.timeSlotId)}
                  >
                    {activeFormId === timeslot.timeSlotId ? "Close" : "Book"}
                  </button>
                </div>

                {activeFormId === timeslot.timeSlotId && (
                    <form
                        onSubmit={(e) => handleBooking(e, timeslot)}
                        className="mt-6 space-y-4"
                    >
                      <div>
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
                        <input
                            disabled={true}
                            type="text"
                            name="userId"
                            id="userId"
                            required
                            className="mt-1 border px-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="mt-1 border px-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            id="phoneNumber"
                            required
                            className="mt-1 border px-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <button
                          type="submit"
                          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                      >
                        Confirm Booking
                      </button>
                    </form>
                )}
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
      <TimeSlots timeslots={timeslots} service={state.service} />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
