import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";

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
        error.response?.data?.message || "Failed to load dashboard statistics"
      );
    }
  };

  const cards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      color: "#0d6efd",
    },
    {
      title: "Total Departments",
      value: stats.totalDepartments,
      color: "#198754",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      color: "#6f42c1",
    },
  ];

  return (
    <div>
      <h2
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Dashboard Statistics
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: "#fff",
              borderLeft: `6px solid ${card.color}`,
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h5
              style={{
                marginBottom: "10px",
                color: "#6c757d",
              }}
            >
              {card.title}
            </h5>

            <h2
              style={{
                margin: 0,
                color: card.color,
              }}
            >
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardCards;