import { useState, useEffect } from 'react';
import axios from 'axios';

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                if (!token) {
                    setError('No token found, please log in');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('/api/users/current', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCurrentUser(response.data);
            } catch (err) {
                setError('Error fetching current user');
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    return { currentUser, loading, error };
};

export default useCurrentUser;
