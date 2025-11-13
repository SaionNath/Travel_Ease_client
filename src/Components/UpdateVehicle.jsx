import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateVehicle = () => {
    const vehicle = useLoaderData();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vehicleName: vehicle.vehicleName,
        owner: vehicle.owner,
        category: vehicle.category,
        pricePerDay: vehicle.pricePerDay,
        location: vehicle.location,
        availability: vehicle.availability,
        description: vehicle.description,
        coverImage: vehicle.coverImage,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch(`http://localhost:3000/vehicles/${vehicle._id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
            Swal.fire("Updated!", "Vehicle updated successfully.", "success");
            navigate("/myVehicles");
        } else {
            Swal.fire("Error", data.message || "Update failed.", "error");
        }
        } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong.", "error");
        }
    };

    useEffect(() => {
    document.title = "Update Vehicles";
  }, []);

  return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-5">Update Vehicle</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                {Object.keys(formData).map((key) => (
                <div key={key}>
                    <label className="block font-medium mb-1">{key}</label>
                    <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    />
                </div>
                ))}
                <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                Update Vehicle
                </button>
            </form>
        </div>
  );
};

export default UpdateVehicle;
