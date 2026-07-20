import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";

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
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Recent Employees
      </h3>

      {employees.length === 0 ? (
        <p>No recent employees found.</p>
      ) : (
        <ul
          style={{
            margin: 0,
            paddingLeft: "20px",
          }}
        >
          {employees.map((employee) => (
            <li
              key={employee._id}
              style={{
                marginBottom: "12px",
                color: "#495057",
                lineHeight: "1.6",
              }}
            >
              <strong>{employee.name}</strong>

              {employee.department && (
                <> — {employee.department.name}</>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentActivity;