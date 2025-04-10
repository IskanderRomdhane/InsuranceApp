import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import {useAuth} from "../../Hooks/AuthContext.jsx";
import {handleLoginSuccess} from "./handleLoginSuccess.js";

const PasswordPage = () => {
    const navigate = useNavigate();
    const [passwordData, setPasswordData] = useState({
        password: '',
        verifyPassword: ''
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const {getUserRole} = useAuth();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });

        // Check if passwords match when typing in verification field
        if (name === 'verifyPassword') {
            setPasswordsMatch(value === passwordData.password || value === '');
        } else if (name === 'password' && passwordData.verifyPassword) {
            setPasswordsMatch(value === passwordData.verifyPassword);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (passwordData.password !== passwordData.verifyPassword) {
            setPasswordsMatch(false);
            return;
        }

        // Validate password strength
        if (passwordData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const username = localStorage.getItem('username');

            const response = await fetch('http://localhost:8081/api/auth/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    newPassword: passwordData.password
                }),
            });

            if (response.ok) {
                navigate('/dashboard');
                const response = await fetch('http://localhost:8081/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                const clientRoles = handleLoginSuccess(data, getUserRole, navigate);

            } else {
                const data = await response.json();
                setError(data.message || 'Failed to update password');
            }
        } catch (err) {
            setError('An error occurred while updating your password');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-bold text-gray-900">Set New Password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Welcome to Wiqaya Insurance! Please set a new password for your account.
                    </p>
                </div>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your new password"
                                value={passwordData.password}
                                onChange={handleChange}
                                minLength={8}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Must be at least 8 characters long
                            </p>
                        </div>

                        <div>
                            <label htmlFor="verifyPassword" className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <input
                                id="verifyPassword"
                                name="verifyPassword"
                                type="password"
                                required
                                className={`relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                    !passwordsMatch ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Confirm your new password"
                                value={passwordData.verifyPassword}
                                onChange={handleChange}
                            />
                            {!passwordsMatch && (
                                <p className="mt-1 text-xs text-red-600">
                                    Passwords do not match
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? 'Setting Password...' : 'Set New Password & Continue'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default PasswordPage;