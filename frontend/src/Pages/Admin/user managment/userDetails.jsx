import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, AlertCircle, ChevronLeft } from "lucide-react";
import axios from "axios";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const url = `http://localhost:8081/api/user/${id}`; // Adjust endpoint as needed
        const response = await axios.get(url);
        setUser(response.data);
      } catch (error) {
        setError("Unable to retrieve user details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not Available";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleUserStatus = async () => {
    try {
      const url = `http://localhost:8081/api/user/${id}/status?active=${!user.active}`;
      const response = await axios.put(url);
      setUser(response.data); // update local state with new status
    } catch (error) {
      console.error("Failed to update user status", error);
      alert("Error updating user status.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-600"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-gray-200"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-6">
        <section className="bg-white border border-gray-300 rounded-lg p-8 max-w-md w-full">
          <div className="flex items-center text-red-600 mb-6">
            <AlertCircle className="w-8 h-8 mr-3" />
            <h3 className="text-xl font-bold">Error</h3>
          </div>
          <p className="text-gray-600 mb-6 text-lg">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            Return to Users
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">User #{user.id}</h1>
      </header>

      {/* Main Content */}
      <article className="space-y-10">
        {/* User Info */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">User Role</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.role || "USER"}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center text-gray-700">
            <Calendar className="w-6 h-6 mr-3 text-gray-600" />
            <div>
              <p className="text-sm text-gray-500">Joined On</p>
              <span className="text-base font-medium">
                {formatDate(user.createdDate)}
              </span>
            </div>
          </div>
        </section>

        {/* User Details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                {user.firstname || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                {user.lastname || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                {user.email || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                {user.username || "N/A"}
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <button
          onClick={toggleUserStatus}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            user.active
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {user.active ? "Deactivate User" : "Activate User"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-200"
        >
          Back to Users
        </button>
      </footer>
    </main>
  );
};

export default UserDetails;
