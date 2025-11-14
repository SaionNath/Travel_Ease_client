import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const MyVehicles = () => {
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://travel-ease-server-ten.vercel.app/my_vehicles?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setVehicles(data));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This vehicle will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`https://travel-ease-server-ten.vercel.app/vehicles/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (data.success) {
          Swal.fire("Deleted!", "Your vehicle has been deleted.", "success");
          setVehicles((prev) => prev.filter((v) => v._id !== id));
        } else {
          Swal.fire("Error", "Failed to delete vehicle.", "error");
        }
      }
    });
  };

  useEffect(() => {
    document.title = "My Vehicles";
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5 text-center">My Vehicles</h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-500">No vehicles added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white shadow-md rounded-lg p-4 border"
            >
              <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">
                {vehicle.vehicleName}
              </h3>
              <p className="text-gray-600">{vehicle.location}</p>
              <p className="font-medium text-gray-800">
                ${vehicle.pricePerDay}/day
              </p>

              <div className="flex justify-between mt-3">
                <Link
                  to={`/product_details/${vehicle._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                >
                  View
                </Link>
                <Link
                  to={`/update_vehicle/${vehicle._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
