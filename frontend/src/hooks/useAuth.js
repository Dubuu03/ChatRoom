import { useState } from 'react';
import api from '../utils/api';

export const useAuth = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const login = async (identifier, password, keepMeLoggedIn) => {
        try {
            const response = await api.post('/auth/login', { identifier, password });
            const token = response.data.token;

            const storage = keepMeLoggedIn ? localStorage : sessionStorage;
            storage.setItem('token', token);
            storage.setItem('identifier', identifier);

            return true;
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || 'Login failed. Please try again.'
            );
            return false;
        }
    };

    const register = async (username, email, password) => {
        try {
            await api.post('/auth/register', { username, email, password });
            setSuccessMessage('Registration successful! Redirecting to login...');
            return true;
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || 'Registration failed. Please try again.'
            );
            return false;
        }
    };

    return {
        errorMessage,
        successMessage,
        login,
        register,
        setErrorMessage,
        setSuccessMessage,
    };
};
