import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      const userEmail = decoded.email;

      fetch(`http://localhost:8081/api/notifications/user/${userEmail}`)
        .then((res) => res.json())
        .then((data) => setNotifications(data))
        .catch((err) => console.error("Error fetching notifications:", err));
    }
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">All Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification, idx) => (
          <div
            key={idx}
            className="border-b border-gray-200 py-3 text-gray-800 hover:bg-gray-50 px-4"
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
