import React, { use } from 'react';
import LVehicle from './LVehicle';

const LatestVehicles = ({LatestVehiclesPromise}) => {
    const vehicles = use(LatestVehiclesPromise)
    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className="text-4xl text-center">Recent <span className='text-yellow-500'>vehicles</span></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    vehicles.map(vehicle => <LVehicle key = {vehicle._id} vehicle = {vehicle}></LVehicle>)
                }
            </div>
        </div>
    );
};

export default LatestVehicles;