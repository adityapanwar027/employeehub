import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import RecentActivity from "../../components/dashboard/RecentActivity";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <DashboardLayout>
     <DashboardCards />
     <DashboardCharts />
     <RecentActivity />

      <button onClick={handleLogout}>
        Logout
      </button>
    </DashboardLayout>
  );
}

export default Dashboard;