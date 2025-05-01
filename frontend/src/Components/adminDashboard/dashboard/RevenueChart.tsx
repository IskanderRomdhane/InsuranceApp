import React from "react";
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
export const RevenueChart = () => {
  const data = [
    {
      month: "Jan",
      revenue: 8500,
      target: 8000,
    },
    {
      month: "Feb",
      revenue: 9200,
      target: 8200,
    },
    {
      month: "Mar",
      revenue: 9800,
      target: 8400,
    },
    {
      month: "Apr",
      revenue: 9600,
      target: 8600,
    },
    {
      month: "May",
      revenue: 11000,
      target: 8800,
    },
    {
      month: "Jun",
      revenue: 10800,
      target: 9000,
    },
    {
      month: "Jul",
      revenue: 11700,
      target: 9200,
    },
    {
      month: "Aug",
      revenue: 12400,
      target: 9400,
    },
    {
      month: "Sep",
      revenue: 12100,
      target: 9600,
    },
    {
      month: "Oct",
      revenue: 12900,
      target: 9800,
    },
    {
      month: "Nov",
      revenue: 13400,
      target: 10000,
    },
    {
      month: "Dec",
      revenue: 14200,
      target: 10200,
    },
  ];
  return (
    <div className="h-80">
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
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value / 1000}k`} width={60} />
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Bar
            dataKey="revenue"
            name="Revenue"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="target"
            name="Target"
            fill="#c7d2fe"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
