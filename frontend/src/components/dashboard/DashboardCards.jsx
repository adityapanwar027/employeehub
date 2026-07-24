import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaBuilding,
  FaUserShield,
} from "react-icons/fa";
import "./DashboardCards.css";

function DashboardCards() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/stats");
      setStats(response.data.stats);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard statistics"
      );
    }
  };

  const cards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: <FaUsers />,
      gradient: "linear-gradient(135deg,#2563eb,#60a5fa)",
    },
    {
      title: "Departments",
      value: stats.totalDepartments,
      icon: <FaBuilding />,
      gradient: "linear-gradient(135deg,#10b981,#34d399)",
    },
    {
      title: "System Users",
      value: stats.totalUsers,
      icon: <FaUserShield />,
      gradient: "linear-gradient(135deg,#7c3aed,#a855f7)",
    },
  ];

  return (
    <div className="dashboard-cards">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Quick overview of your EmployeeHub statistics.</p>
      </div>

      <div className="cards-grid">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            className="stat-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{
              scale: 1.04,
              y: -8,
            }}
            style={{
              background: card.gradient,
            }}
          >
            <div className="card-top">
              <div className="card-icon">{card.icon}</div>
            </div>

            <h4>{card.title}</h4>

            <h1>{card.value}</h1>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default DashboardCards;