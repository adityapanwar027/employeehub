import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUserCircle, FaBuilding } from "react-icons/fa";
import "./RecentActivity.css";

function RecentActivity() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchRecentEmployees();
  }, []);

  const fetchRecentEmployees = async () => {
    try {
      const response = await axiosInstance.get(
        "/dashboard/recent-employees"
      );

      setEmployees(response.data.employees);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load recent employees"
      );
    }
  };

  return (
    <motion.div
      className="recent-card"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="recent-header">
        <h2>Recent Employees</h2>
        <p>Latest employees added to EmployeeHub</p>
      </div>

      {employees.length === 0 ? (
        <div className="empty-state">
          No recent employees found.
        </div>
      ) : (
        <div className="employee-grid">
          {employees.map((employee) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={employee._id}
              className="employee-card"
            >
              <div className="employee-avatar">
                <FaUserCircle />
              </div>

              <div className="employee-info">
                <h4>{employee.name}</h4>

                <span className="department-badge">
                  <FaBuilding />
                  {employee.department?.name || "No Department"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default RecentActivity;