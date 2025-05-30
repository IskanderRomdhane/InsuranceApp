import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { sinistreDistribution } from "./DashboardManagment";

export const PolicyDistributionChart = () => {
  const [data, setData] = useState([]);

  const COLORS = ["#428e86", "#d98a6c", "#97c0ae", "#99953b", "#14b8a6"];

  useEffect(() => {
    const fetchSinistres = async () => {
      try {
        const sinistres = await sinistreDistribution();

        const counts = sinistres.reduce((acc, curr) => {
          const key = curr.categorie;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(counts).map(([name, value]) => ({
          name,
          value: Number(value),
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching sinistres", error);
      }
    };

    fetchSinistres();
  }, []);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} cases`} />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
