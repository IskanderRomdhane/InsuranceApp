import React, { useEffect, useState } from "react";
import axios from "axios"; // Assuming you're using axios for API requests
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Define the type for the sinistre data
interface SinistreData {
  month: string;
  count: number;
}

export const SinistreChart = () => {
  const [data, setData] = useState<SinistreData[]>([]); // Set type of data to SinistreData[]

  // Helper function to convert month number to month name
  const getMonthName = (monthNumber: number): string => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthNumber - 1]; // Adjusting because months are 1-indexed (1 = Jan)
  };

  // Ensure all months are included (even if no data for some)
  const fillMissingMonths = (data: any[]) => {
    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Create a map of the data with month as the key
    const dataMap = new Map();
    data.forEach((item) => {
      const month = getMonthName(item.month);
      dataMap.set(month, item.count);
    });

    // Create a complete dataset with all months
    const completeData = allMonths.map((month) => ({
      month,
      count: dataMap.get(month) || 0, // Use 0 if no data is available for this month
    }));

    return completeData;
  };

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/sinistre/sinistres/per-month")
      .then((response) => {
        console.log("Fetched data:", response.data); // Log to check the data
        const sinistreData = response.data.map((item) => ({
          month: item.month,
          count: item.count,
        }));

        // Fill missing months
        const completeData = fillMissingMonths(sinistreData);
        setData(completeData);
      })
      .catch((error) => console.error("Error fetching sinistre data", error));
  }, []);

  // Log the data in the render part to see if it's populated
  console.log("Chart data:", data);

  return (
    <div className="h-80">
      {/* Ensure the chart container has enough height */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" /> {/* X-Axis uses the month name now */}
          <YAxis tickFormatter={(value) => `${value}`} width={60} />
          <Tooltip
            formatter={(value) => [value, undefined]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Bar
            dataKey="count"
            name="Sinistre Count"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
