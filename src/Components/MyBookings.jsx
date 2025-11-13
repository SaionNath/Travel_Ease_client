import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => console.error(err));
    }, [user]);

    useEffect(() => {
    document.title = "My Bookings";
  }, []);

  return (
        <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
        {bookings.length === 0 ? (
            <p>No bookings found.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
                <div
                key={booking._id}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                <h3 className="text-xl font-semibold">{booking.vehicleName}</h3>
                <p className="text-gray-600">Owner: {booking.owner}</p>
                <p className="text-gray-700">Location: {booking.location}</p>
                <p className="font-semibold">
                    Price Per Day: ${booking.pricePerDay}
                </p>
                <p className="mt-2">
                    Status:{" "}
                    <span
                    className={`font-semibold ${
                        booking.status === "Pending"
                        ? "text-yellow-600"
                        : booking.status === "Confirmed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                    >
                    {booking.status}
                    </span>
                </p>
                <p className="text-gray-500 mt-1">
                    Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                </p>
                </div>
            ))}
            </div>
        )}
        </div>
  );
};

export default MyBookings;