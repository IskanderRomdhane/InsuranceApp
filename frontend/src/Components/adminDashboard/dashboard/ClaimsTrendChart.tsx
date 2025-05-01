import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Interface for the status and values
interface ReclamationData {
  month: string;
  status: string; // The status will be displayed on the chart
}

export const ClaimsTrendChart = () => {
  const [reclamations, setReclamations] = useState<ReclamationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reclamations data when the component mounts
    axios
      .get("http://localhost:8081/api/reclamation/getusersrelamations")
      .then((response) => {
        console.log("Reclamations data:", response.data);
        setReclamations(response.data); // Assuming the response contains reclamations with 'status'
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reclamations:", error);
        setLoading(false);
      });
  }, []);

  // Check if the data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Map status to appropriate value
  const statusMap: { [key: string]: string } = {
    PENDING: "Pending",
    UNDER_REVIEW: "Under Review",
    CANCELLED: "Cancelled",
    FINISHED: "Finished",
  };

  // Create a count of each status per month
  const statusCounts = (status: string) => {
    return reclamations.filter((reclamation) => reclamation.status === status)
      .length;
  };

  const statusData = [
    {
      month: "Jan",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
    {
      month: "Feb",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
    {
      month: "Mar",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
    {
      month: "Apr",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
    {
      month: "May",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
    {
      month: "Jun",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
    {
      month: "Jul",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
    {
      month: "Aug",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
    {
      month: "Sep",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
    {
      month: "Oct",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
    {
      month: "Nov",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
    {
      month: "Dec",
      PENDING: statusCounts("PENDING"),
      UNDER_REVIEW: statusCounts("UNDER_REVIEW"),
      CANCELLED: statusCounts("CANCELLED"),
      FINISHED: statusCounts("FINISHED"),
    },
  ];

  // Log the count for UNDER_REVIEW status
  console.log("UNDER_REVIEW count:", statusCounts("UNDER_REVIEW"));

  // Optional: log all the status data
  console.log("Status Data:", statusData);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={statusData} // Use the modified data with status counts
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis width={40} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="PENDING"
            name={statusMap.PENDING} // Show the status name in the legend
            stroke="#6366f1"
            strokeWidth={2}
            activeDot={{
              r: 8,
            }}
          />
          <Line
            type="monotone"
            dataKey="UNDER_REVIEW"
            name={statusMap.UNDER_REVIEW}
            stroke="#10b981"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="CANCELLED"
            name={statusMap.CANCELLED}
            stroke="#ef4444"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="FINISHED"
            name={statusMap.FINISHED}
            stroke="#ff9900"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
