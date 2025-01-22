import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = useCallback(() => {
        // Clear authentication data from localStorage and sessionStorage
        localStorage.removeItem('token');
        localStorage.removeItem('identifier');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('identifier');

        // Redirect to login page
        navigate('/login');
    }, [navigate]);

    return { logout };
};
