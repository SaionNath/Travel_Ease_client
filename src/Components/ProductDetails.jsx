import React from "react";
import { useLoaderData } from "react-router";

const ProductDetails = () => {
  const vehicle = useLoaderData();

  const {
    _id,
    vehicleName,
    owner,
    category,
    pricePerDay,
    location,
    availability,
    description,
    coverImage,
  } = vehicle;
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white mb-3">
      <img
        src={coverImage}
        alt={vehicleName}
        className="w-full h-72 object-cover rounded-xl"
      />
      <h2 className="text-3xl font-bold mt-4">{vehicleName}</h2>
      <p className="text-gray-600">Owner: {owner}</p>
      <p className="text-gray-600">Category: {category}</p>
      <p className="text-lg font-semibold mt-2">
        Price Per Day: ${pricePerDay}
      </p>
      <p className="text-gray-700 mt-2">Location: {location}</p>
      <p className="mt-2">
        <span
          className={`font-semibold ${
            availability === "Available" ? "text-green-600" : "text-red-600"
          }`}
        >
          {availability}
        </span>
      </p>
      <p className="mt-4 text-gray-700">{description}</p>

      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Book Now
      </button>
    </div>
  );
};

export default ProductDetails;
