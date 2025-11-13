import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const AddVehicles = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const vehicleData = {
      vehicleName: form.vehicleName.value,
      owner: form.owner.value,
      category: form.category.value,
      pricePerDay: parseFloat(form.pricePerDay.value),
      location: form.location.value,
      availability: form.availability.value,
      description: form.description.value,
      coverImage: form.coverImage.value,
      userEmail: user?.email || "unknown",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:3000/vehicles", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(vehicleData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Vehicle Added!",
          text: "Your vehicle has been successfully added.",
          confirmButtonColor: "#3085d6",
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not add vehicle. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while adding the vehicle.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Vehicle</h2>
      <form onSubmit={handleAddVehicle} className="space-y-4">
        <input
          type="text"
          name="vehicleName"
          placeholder="Vehicle Name"
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="text"
          name="owner"
          placeholder="Owner Name"
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="number"
          name="pricePerDay"
          placeholder="Price Per Day"
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border p-3 rounded"
          required
        />
        <select
          name="availability"
          className="w-full border p-3 rounded"
          required
        >
          <option value="">Select Availability</option>
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL"
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="w-full border p-3 rounded bg-gray-100 cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default AddVehicles;