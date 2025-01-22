import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormField } from '../hooks/useFormField';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const username = useFormField('');
    const email = useFormField('');
    const password = useFormField('');
    const confirmPassword = useFormField('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, errorMessage, successMessage, setErrorMessage } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!username.value || !email.value || !password.value || !confirmPassword.value) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        if (password.value !== confirmPassword.value) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        const success = await register(username.value, email.value, password.value);
        if (success) {
            setTimeout(() => navigate('/login'), 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 font-medium mb-2 text-left">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500"
                            {...username}
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 font-medium mb-2 text-left">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500"
                            {...email}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-600 font-medium mb-2 text-left">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500"
                            {...password}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-11 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="mb-4 relative">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-600 font-medium mb-2 text-left"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500"
                            {...confirmPassword}
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-11 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                    {successMessage && (
                        <p className="text-green-500 text-sm mb-4">{successMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Register
                    </button>
                </form>

                <div className="text-center mt-4">
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-700 text-sm">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
