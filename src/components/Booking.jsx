import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export function Booking() {
  const { serviceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state && location.state.booking) {
      setBookingDetails(location.state.booking);
    } else {
      setError("No booking details found.");
    }
  }, [location]);

  const handleConfirmBooking = async () => {
    try {
      const response = await fetch("api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId,
          ...bookingDetails,
        }),
      });
      if (response.ok) {
        alert("Booking confirmed successfully!");
        navigate("/services");
      } else {
        throw new Error("Booking confirmation failed.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-red-600">{error}</p>
        <button
          onclick={() => navigate("/services")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Confirm Booking</h1>
      {bookingDetails ? (
        <div>
          <p>Service ID: {serviceId}</p>
          {/* Add more booking details as needed */}
          <button
            onClick={handleConfirmBooking}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm Booking
          </button>
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
}
