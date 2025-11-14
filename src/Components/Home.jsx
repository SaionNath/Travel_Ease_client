import React, { useEffect } from 'react';
import LatestVehicles from './LatestVehicles';
import Banner from './Banner';


const LatestVehiclesPromise = fetch('https://travel-ease-server-otpwqgljp-saions-projects-c6f93d3f.vercel.app/latest_vehicles').then(res => res.json());

const Home = () => {
    useEffect(() => {
    document.title = "Home";
  }, []);
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