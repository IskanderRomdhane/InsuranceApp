import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  RefreshCw,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

const ReclamationDetails = () => {
  const [claim, setClaim] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaimDetails = async () => {
      try {
        const url = `http://localhost:8081/api/reclamation/getreclamation/${id}`;
        const response = await axios.get(url);
        const data = response.data;
        setClaim(data);
        setStatus(data.status);
      
      } catch (error) {
        setError("Unable to retrieve claim details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClaimDetails();
    }
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      const url = `http://localhost:8081/api/reclamation/changerstatus/${id}`;
      await axios.put(
        url,
        { status },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setClaim((prev) => ({ ...prev, status }));
    } catch (error) {
      setError("Failed to update claim status");
      console.error(error);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      PENDING: { text: "text-yellow-600" },
      UNDER_REVIEW: { text: "text-blue-600" },
      CANCELLED: { text: "text-red-600" },
      FINISHED: { text: "text-green-600" },
    };
    return styles[status] || styles["PENDING"];
  };

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
            Return to Claims
          </button>
        </section>
      </main>
    );
  }

  const statusStyle = getStatusStyle(claim.status);

  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Claim #{claim.id}</h1>
      </header>

      {/* Main Content */}
      <article className="space-y-10">
        {/* Status and Timeline */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Current Status</p>
            <p className={`text-lg font-semibold ${statusStyle.text}`}>
              {claim.status.replace("_", " ")}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center text-gray-700">
            <Calendar className="w-6 h-6 mr-3 text-gray-600" />
            <div>
              <p className="text-sm text-gray-500">Submitted</p>
              <span className="text-base font-medium">
                {formatDate(claim.date)}
              </span>
            </div>
          </div>
        </section>

        {/* Claim Details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Claim Metadata */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                {claim.name || "John"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                {claim.lastName || "Doe"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                {claim.email || "johndoe@example.com"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Objet du Réclamation
              </label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                {claim.type || "Service Delay"}
              </p>
            </div>
          </div>

          {/* Right Column: Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {claim.description ||
                "I submitted a request for specific service on date, and I was informed that it would be completed within expected timeframe. However, as of today, I have not received any updates, and the service is still pending. This delay is causing inconvenience, and I would appreciate an urgent update on the status of my request. Please let me know the reason for the delay and when I can expect the service to be completed. Looking forward to your prompt response."}
            </p>
          </div>
        </section>

        {/* Status Update Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Change Status</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="PENDING">Pending</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="FINISHED">Finished</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-all duration-200 flex items-center"
            >
              <RefreshCw className="w-5 h-5 mr-2 animate-spin-slow" />
              Update Status
            </button>
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-200"
        >
          Back to Claims
        </button>
      </footer>
    </main>
  );
};

export default ReclamationDetails;
