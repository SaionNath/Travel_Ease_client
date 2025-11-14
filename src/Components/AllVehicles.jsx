import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../Hooks/useAxios";

const AllVehicles = () => {
  const axiosInstance = useAxios();
  const [vehicles, setVehicles] = useState([]);

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    axiosInstance.get("/vehicles")
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    document.title = "All Vehicles";
  }, []);

  const filteredVehicles = vehicles
    .filter((v) => (category ? v.category === category : true))
    .sort((a, b) => {
      if (price === "low") return a.pricePerDay - b.pricePerDay;
      if (price === "high") return b.pricePerDay - a.pricePerDay;
      return 0;
    });

  return (
      <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-3xl font-bold mb-6">All Vehicles</h2>
          <div className="flex gap-4 mb-6">
            <select className="select select-bordered"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
              <option value="Van">Van</option>
            </select>

            <select
              className="select select-bordered"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={vehicle.coverImage}
                  alt={vehicle.vehicleName}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-2">
                  {vehicle.vehicleName}
                </h3>
                <p className="text-gray-600">Owner: {vehicle.owner}</p>
                <p className="text-gray-600">Category: {vehicle.category}</p>
                <p className="font-semibold mt-1">${vehicle.pricePerDay} / day</p>
                <p className="text-gray-700">Location: {vehicle.location}</p>
                <Link
                  to={`/product_details/${vehicle._id}`}
                  className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
      </div>
  );
};

export default AllVehicles;