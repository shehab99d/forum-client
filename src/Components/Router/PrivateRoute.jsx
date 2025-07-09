import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Loading/Loading';



const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return (
            <Navigate
                to="/join-us"
                state={{ from: location }} // পুরো location object পাঠাও
                replace
            />
        );
    }

    return children;
};

export default PrivateRoute;
