import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const storedUser = localStorage.getItem("techifyUser");
    const user = storedUser ? JSON.parse(storedUser) : null;

    // For testing: Allow any logged in user
    if (!user) { // || user.role !== 'admin'
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
