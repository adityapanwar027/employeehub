import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
    }
  }

  if (!employee) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
  <div className="container mt-4">
    <h2>Employee Details</h2>

    <table className="table table-bordered mt-3">
      <tbody>
        <tr>
          <th>Employee ID</th>
          <td>{employee.employeeId}</td>
        </tr>

        <tr>
          <th>Name</th>
          <td>{employee.name}</td>
        </tr>

        <tr>
          <th>Email</th>
          <td>{employee.email}</td>
        </tr>

        <tr>
          <th>Phone</th>
          <td>{employee.phone}</td>
        </tr>

        <tr>
          <th>Position</th>
          <td>{employee.position}</td>
        </tr>

        <tr>
          <th>Salary</th>
          <td>{employee.salary}</td>
        </tr>

        <tr>
          <th>Department</th>
          <td>{employee.department?.name || "N/A"}</td>
        </tr>
      </tbody>
    </table>

    <Link
      to={`/documents/${employee._id}`}
      className="btn btn-primary me-2"
    >
      Documents
    </Link>

    <Link to="/employees" className="btn btn-secondary">
      Back
    </Link>
  </div>
);
}
export default EmployeeDetails;