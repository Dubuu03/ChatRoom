import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormField } from '../hooks/useFormField';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const identifier = useFormField('');
    const password = useFormField('');
    const [showPassword, setShowPassword] = useState(false);
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
    const { login, errorMessage, setErrorMessage } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!identifier.value || !password.value) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        const success = await login(identifier.value, password.value, keepMeLoggedIn);
        if (success) navigate('/chat');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-gray-600 font-medium mb-2 text-left">
                            Username or Email
                        </label>
                        <input
                            id="identifier"
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500"
                            {...identifier}
                            placeholder="Enter your username or email"
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

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="keepMeLoggedIn"
                            className="mr-2"
                            checked={keepMeLoggedIn}
                            onChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
                        />
                        <label htmlFor="keepMeLoggedIn" className="text-sm text-gray-600">
                            Keep me logged in
                        </label>
                    </div>

                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-4">
                    <Link to="/register" className="text-indigo-600 hover:text-indigo-700 text-sm">
                        Don't have an account? Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
