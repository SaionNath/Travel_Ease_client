import React from 'react';
import LatestVehicles from './LatestVehicles';
import Banner from './Banner';


const LatestVehiclesPromise = fetch('http://localhost:3000/latest_vehicles').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div>
                <LatestVehicles LatestVehiclesPromise = {LatestVehiclesPromise}></LatestVehicles>
            </div>
        </div>
    );
};

export default Home;