import React, { use } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const Nav = () => {
    const {user, LogOut} = use(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        LogOut()
        .then(() => {
            navigate("/");
        })
        .catch(() => {
            alert("Log Out failled, try again.")
        })
    }

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to = "/allvehicles">All Vehicles</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            {/* logo */}
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    {links}
                </ul>
                </div>
                <a className="btn btn-ghost text-xl">Travel_Ease</a>
            </div>
            {/* middle */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {links}
                </ul>
            </div>
            {/* btns */}
            <div className="navbar-end">
                {
                    user ?

                    <p onClick={handleLogOut} className="btn mr-2 hover:btn-primary"><NavLink to = "">Log out</NavLink></p> : 

                    <div>
                        <p className="btn btn-primary"><NavLink to = "/login">Login</NavLink></p>
                        <p className="btn btn-primary"><NavLink to = "/register">Register</NavLink></p>
                    </div>   
                }
            </div>
        </div>
    );
};

export default Nav;