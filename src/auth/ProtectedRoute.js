import React from "react";

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ redirect, component: Component, ...rest }) => {
    const token = localStorage.getItem("token")
    const auth1 = token ? true : false // determine if authorized, from context or however you're doing it    debugger 
    return auth1 ? <Outlet /> : <Navigate to={redirect} />;
}

export default ProtectedRoute;