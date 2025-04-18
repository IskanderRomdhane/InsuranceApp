// src/pages/NotificationDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NotificationDetail = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const userEmail = decoded.email;

        const response = await fetch(
          `http://localhost:8081/api/notifications/user/${userEmail}`
        );
        if (response.ok) {
          const data = await response.json();
          const found = data.find((n) => n.id.toString() === id);
          setNotification(found);
        } else {
          console.error("Failed to fetch notifications.");
        }
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };

    fetchNotification();
  }, [id]);

  if (!notification) {
    return <div className="p-4">Loading notification...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notification Details</h2>
      <div className="bg-white shadow p-4 rounded">
        <p>
          <strong>ID:</strong> {notification.id}
        </p>
        <p>
          <strong>Message:</strong> {notification.message}
        </p>
      </div>
    </div>
  );
};

export default NotificationDetail;
