import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const RequireAdmin = ({ children }) => {
    const user = useAuth();
    if (user.id !== "1") {
        return <Navigate to='/' />;
    }

    return children;
};

export default RequireAdmin;
