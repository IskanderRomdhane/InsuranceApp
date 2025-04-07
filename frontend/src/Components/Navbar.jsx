import React, { useState, useEffect, useRef } from 'react';
import Default_pfp from '/src/assets/NavBar/Default_pfp.jpg';
const Navbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    // Handle clicks outside notification dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notificationRef]);

    // Handle profile click
    const handleProfileClick = () => {
        // In a real app, you would use router navigation here
        // For example with React Router: navigate('/profile')

    };

    // Toggle notifications dropdown
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <nav className="bg-white shadow-sm px-6 py-2 flex items-center justify-between">
            {/* Brand/Logo */}
            <div className="text-lg font-bold text-gray-800"></div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
                {/* Notification Icon */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={toggleNotifications}
                        className="text-gray-600 hover:text-blue-600 focus:outline-none relative"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">1</span>
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-72 z-10 py-1">
                            <div className="px-4 py-2 font-semibold text-gray-800 border-b border-gray-100">
                                Notifications
                            </div>

                            {/* Notification Items */}
                            <div className="max-h-80 overflow-y-auto">
                                <div className="px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-800">
                                          Your claim status has been updated
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                                    </div>
                                </div>

                            <div className="text-center py-2 text-sm text-blue-600 hover:bg-gray-50 cursor-pointer border-t border-gray-100">
                                View all notifications
                            </div>
                        </div>
                        </div>
                    )}
                </div>

                {/* Profile Icon */}
                <div>
                    <button
                        onClick={handleProfileClick}
                        className="focus:outline-none"
                    >
                        <img
                            src={Default_pfp}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-colors"
                        />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;