import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layout/RootLayout';
import Home from '../Components/Home';
import AllVehicles from '../Components/AllVehicles';
import Register from '../Components/Register';
import Login from '../Components/Login';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
            path: 'allvehicles',
            Component: AllVehicles,
        },
        {
            path: 'register',
            Component: Register,
        },
        {
            path: 'login',
            Component: Login,
        },
    ]
  },
]);