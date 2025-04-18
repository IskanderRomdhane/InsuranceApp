import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode"; // Correct named import
import Default_pfp from "/src/assets/NavBar/Default_pfp.jpg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);

  // Handle clicks outside notification dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  // Fetch notifications for the user
  const fetchNotifications = async (userEmail) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/notifications/user/${userEmail}`
      );
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error("Error fetching notifications: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };

  // Fetch notifications on component mount (after login)
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      const userEmail = decoded.email;
      fetchNotifications(userEmail);
    }
  }, []);

  // Handle profile click
  const handleProfileClick = () => {};

  // Toggle notifications dropdown
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Manually refresh notifications
  const handleViewAllNotifications = () => {
    navigate("/notifications");
  };

  return (
    <nav className="bg-white px-6 py-2 flex items-center justify-between">
      {/* Brand/Logo */}
      <div className="text-lg font-bold text-gray-800">YourApp</div>

      {/* Icons */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={toggleNotifications}
            className="text-gray-600 hover:text-blue-600 focus:outline-none relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            {/* Notification count badge */}
            {localStorage.getItem("access_token") &&
              notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {notifications.length}
                </span>
              )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-72 z-10 py-1">
              <div className="px-4 py-2 font-semibold text-gray-800 border-b border-gray-100">
                Notifications
              </div>

              {/* Notification Items */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  [...notifications].slice(0, 5).map((notification, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100"
                    >
                      <div>
                        <p
                          className="text-sm text-gray-800 cursor-pointer hover:underline"
                          onClick={() =>
                            navigate(`/notifications/${notification.id}`)
                          }
                        >
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          5 minutes ago
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-center text-gray-500">
                    No notifications yet.
                  </div>
                )}
              </div>

              <div
                className="text-center py-2 text-sm text-blue-600 hover:bg-gray-50 cursor-pointer border-t border-gray-100"
                onClick={handleViewAllNotifications}
              >
                View all notifications
              </div>
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div>
          <button onClick={handleProfileClick} className="focus:outline-none">
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
