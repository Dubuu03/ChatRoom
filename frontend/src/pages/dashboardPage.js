import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthData } from '../hooks/useAuthData';
import { useLogout } from '../hooks/useLogout';
const Dashboard = () => {
    const navigate = useNavigate();
    const { getAuthData, authError, authChecked } = useAuthData();
    const { logout } = useLogout();


    useEffect(() => {
        if (authChecked && authError) {
            navigate('/login');
        }
    }, [authChecked, authError, navigate]);

    const handleNavigate = (route) => {
        navigate(route);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Welcome to Dashboard</h2>
                <div className="space-y-4">
                    <button
                        onClick={() => handleNavigate('/chat')}
                        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 transition duration-300"
                    >
                        Go to Chatroom
                    </button>
                    <button
                        onClick={() => handleNavigate('/edit-profile')}
                        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 transition duration-300"
                    >
                        Edit Profile
                    </button>
                </div>
                <div className="text-center mt-4">
                    <button
                        onClick={logout}
                        className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
