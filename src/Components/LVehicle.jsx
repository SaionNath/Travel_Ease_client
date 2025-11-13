import React from 'react';
import { Link } from 'react-router';

const LVehicle = ({vehicle}) => {
    const {_id, vehicleName, category, pricePerDay, 
        location, availability, coverImage} = vehicle
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="p-4">
                <img
                src={coverImage}
                alt={vehicleName}
                className="w-full h-48  rounded-xl object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{vehicleName}</h2>
                <div className='flex items-center'>
                    <p><span className='font-bold'>Price</span>(price per day): ${pricePerDay}</p>
                    <p><span className='font-bold'>Availability</span>: {availability}</p>
                </div>
                <div className='flex items-center'>
                    <p><span className='font-bold'>Location</span>: {location}</p>
                    <p><span className='font-bold'>Category</span>: {category}</p>
                </div>
                <div className="card-actions">
                <Link to = {`/product_details/${_id}`} className="btn btn-primary w-full">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default LVehicle;