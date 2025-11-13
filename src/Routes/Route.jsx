import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layout/RootLayout';
import Home from '../Components/Home';
import AllVehicles from '../Components/AllVehicles';
import Register from '../Components/Register';
import Login from '../Components/Login';
import Profile from '../Components/Profile';
import PrivateRoute from './PrivateRoute';
import AddVehicles from '../Components/AddVehicles';
import MyVehicles from '../Components/MyVehicles';
import MyBookings from '../Components/MyBookings';
import ProductDetails from '../Components/ProductDetails';

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
        {
            path: "profile",
            Component: Profile,
        },
        {
            path: 'addVehicles',
            element: <PrivateRoute>
                <AddVehicles></AddVehicles>
            </PrivateRoute>
        },
        {
            path: "myVehicles",
            element: <PrivateRoute>
                <MyVehicles></MyVehicles>
            </PrivateRoute>
        },
        {
            path: "myBooking",
            element: <PrivateRoute>
                <MyBookings></MyBookings>
            </PrivateRoute>
        },
        {
        path: "product_details/:id",
        loader: ({params}) => fetch(`http://localhost:3000/vehicles/${params.id}`),
        Component: ProductDetails,
      }
    ]
  },
]);