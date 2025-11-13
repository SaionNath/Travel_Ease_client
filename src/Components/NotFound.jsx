import React from 'react';
import erroeimg from '../assets/img/error-404.png'
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col">
            <div className='flex-1 flex items-center justify-center bg-[#C4C4C4]/20'>
                <div className='text-center'>
                    <img src={erroeimg} alt="" className="mx-auto mb-6" />
                    <h2 className='text-5xl font-semibold mb-6'>Oops, page not found!</h2>
                    <p className='text-gray-500 font-medium'>The page you are looking for is not available.</p>
                    <button onClick={() => navigate(-1)}
                     className="btn bg-black items-center text-white">Go back</button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;