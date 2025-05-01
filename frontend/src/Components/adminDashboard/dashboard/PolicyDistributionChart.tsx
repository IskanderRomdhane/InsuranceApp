import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import axios from "axios";

// Define the type of each data point
type ChartData = {
  name: string;
  value: number;
};

export const PolicyDistributionChart = () => {
  const [data, setData] = useState<ChartData[]>([]); // <- type annotation added

  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f97316", "#14b8a6"];

  useEffect(() => {
    const fetchSinistres = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/sinistre/sinistres"
        );
        const sinistres = response.data;

        console.log(sinistres);

        const counts: Record<string, number> = sinistres.reduce(
          (acc: Record<string, number>, curr: any) => {
            const key = curr.categorie;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
          },
          {}
        );

        const chartData: ChartData[] = Object.entries(counts).map(
          ([name, value]) => ({
            name,
            value: Number(value),
          })
        );

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
            outerRadius={90}
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
