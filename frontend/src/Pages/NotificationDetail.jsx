// src/pages/NotificationDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserNotification } from "./NotificationService";

const NotificationDetail = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const userEmail = decoded.email;

        const data = await fetchUserNotification(userEmail);
        const found = data.find((n) => n.id.toString() === id);
        setNotification(found);
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!notification) {
    return <div className="p-4">Loading notification...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notification Details</h2>
      <div className="bg-white shadow p-4 rounded relative">
        {notification.read && (
          <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
            Read
          </span>
        )}
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
