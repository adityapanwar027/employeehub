import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployeeById } from "../../services/employeeService";

const EmployeeDetails = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    loadEmployee();
  }, []);

  async function loadEmployee() {
    try {
      const data = await getEmployeeById(id);
      setEmployee(data.employee);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load employee details");
    }
  }

  if (!employee) {
    return (
      <h3
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h3>
    );
  }

  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "0 auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          fontWeight: "bold",
          color: "#212529",
        }}
      >
        Employee Details
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "25px",
        }}
      >
        <tbody>
          {[
            ["Employee ID", employee.employeeId],
            ["Name", employee.name],
            ["Email", employee.email],
            ["Phone", employee.phone],
            ["Position", employee.position],
            ["Salary", employee.salary],
            ["Department", employee.department?.name || "N/A"],
          ].map(([label, value]) => (
            <tr key={label}>
              <th
                style={{
                  width: "35%",
                  textAlign: "left",
                  padding: "12px",
                  background: "#f8f9fa",
                  border: "1px solid #dee2e6",
                }}
              >
                {label}
              </th>

              <td
                style={{
                  padding: "12px",
                  border: "1px solid #dee2e6",
                }}
              >
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to={`/documents/${employee._id}`}
          style={{
            background: "#0d6efd",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Documents
        </Link>

        <Link
          to="/employees"
          style={{
            background: "#6c757d",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetails;