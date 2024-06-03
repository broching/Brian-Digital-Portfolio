import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './Context/useAuth';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const { IsLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        if (!IsLoggedIn() && !redirected) {
            toast.warning('Please log in first, you do not have access to this page.');
            setRedirected(true);
            navigate('/');
        }
    }, [IsLoggedIn, navigate, redirected]);

    if (!IsLoggedIn()) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
