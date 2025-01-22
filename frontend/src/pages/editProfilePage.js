import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormField } from '../hooks/useFormField';
import { useAuthData } from '../hooks/useAuthData';
import Form from '../components/Form';
import axios from 'axios';

const EditProfile = () => {
    const { authData, authError, loading: authLoading } = useAuthData();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const username = useFormField('');
    const email = useFormField('');
    const password = useFormField('');
    const confirmPassword = useFormField('');

    useEffect(() => {
        if (authLoading) return;

        if (!authData) {
            navigate('/login');
            return;
        }

        username.setValue(authData.username || '');
        email.setValue(authData.email || '');
        setLoading(false);
    }, [authData, authLoading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!validateForm()) return;

        try {
            const token = localStorage.getItem('token');
            await axios.put(`/api/users/${authData._id}`,
                {
                    username: username.value.trim(),
                    email: email.value.trim(),
                    ...(password.value && { password: password.value }),
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setSuccessMessage('Profile updated successfully');
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Update failed');
        }
    };

    // Rest of the component remains the same
    const validateForm = () => {
        if (!username.value.trim() || !email.value.trim()) {
            setErrorMessage('Username and email are required');
            return false;
        }

        if (password.value && password.value.length < 8) {
            setErrorMessage('Password must be at least 8 characters');
            return false;
        }

        if (password.value !== confirmPassword.value) {
            setErrorMessage('Passwords do not match');
            return false;
        }

        return true;
    };

    // Existing formFields array and render logic remains the same
    const formFields = [
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            value: username.value,
            onChange: username.onChange,
            placeholder: 'Enter your username',
            required: true,
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            value: email.value,
            onChange: email.onChange,
            placeholder: 'Enter your email',
            required: true,
        },
        {
            name: 'password',
            label: 'New Password',
            type: 'password',
            value: password.value,
            onChange: password.onChange,
            placeholder: 'Enter new password (optional)',
            minLength: 8,
        },
        {
            name: 'confirmPassword',
            label: 'Confirm New Password',
            type: 'password',
            value: confirmPassword.value,
            onChange: confirmPassword.onChange,
            placeholder: 'Confirm new password',
            minLength: 8,
        },
    ];

    if (loading || authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Edit Profile</h2>
                <Form
                    fields={formFields}
                    onSubmit={handleSubmit}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    buttonText="Save Changes"
                />
                <div className="text-center mt-4">
                    <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-700 text-sm">
                        Go back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;