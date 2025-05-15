import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  fetchUserNotifications,
  markNotificationAsRead,
} from "../Components/NavbarManagment";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      const userEmail = decoded.email;

      fetchUserNotifications(userEmail)
        .then((data) => setNotifications(data))
        .catch((err) => console.error("Error fetching notifications:", err));
    }
  }, []);

  const handleNotificationClick = async (id) => {
    try {
      await markNotificationAsRead(id);
      navigate(`/notifications/${id}`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">All Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification, idx) => (
          <div
            key={idx}
            onClick={() => handleNotificationClick(notification.id)}
            className={`relative cursor-pointer border-b border-gray-200 py-3 text-gray-800 px-4 ${
              notification.read
                ? "bg-white hover:bg-green-200"
                : "bg-green-100 hover:bg-green-200"
            }`}
          >
            <p className="text-sm">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No notifications yet.</p>
      )}
    </div>
  );
};

export default NotificationsPage;
