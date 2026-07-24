import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./DashboardCharts.css";

function DashboardCharts() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/stats");

      const stats = response.data.stats;

      setChartData([
        {
          name: "Employees",
          value: stats.totalEmployees,
        },
        {
          name: "Departments",
          value: stats.totalDepartments,
        },
        {
          name: "Users",
          value: stats.totalUsers,
        },
      ]);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard statistics"
      );
    }
  };

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="chart-header">
        <h2>Employee Statistics</h2>
        <p>Overview of your EmployeeHub data</p>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="value"
              radius={[12, 12, 0, 0]}
              fill="#2563eb"
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default DashboardCharts;