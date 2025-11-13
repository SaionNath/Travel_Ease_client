import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className="hero min-h-screen mb-3"
            style={{
                backgroundImage:
                "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}
            >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">
                    Travel ease is platform to hire vehicle, add your vehicle to get some cash
                </p>
                <button className="btn btn-primary"><Link to= "allvehicles">Get Started</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Banner;