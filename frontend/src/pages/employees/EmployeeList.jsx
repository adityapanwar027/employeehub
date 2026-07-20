import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getEmployees,
  deleteEmployee,
  searchEmployees,
  getEmployeesByDepartment,
} from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, []);

  async function loadEmployees() {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data.employees);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadDepartments() {
    try {
      const data = await getDepartments();
      setDepartments(data.departments);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = async () => {
    if (!search.trim()) {
      loadEmployees();
      return;
    }

    try {
      setLoading(true);
      const data = await searchEmployees(search);
      setEmployees(data.employees);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentFilter = async (departmentId) => {
    setSelectedDepartment(departmentId);

    if (!departmentId) {
      loadEmployees();
      return;
    }

    try {
      setLoading(true);
      const data = await getEmployeesByDepartment(departmentId);
      setEmployees(data.employees);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearch("");
    setSelectedDepartment("");
    loadEmployees();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully");
      loadEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete employee");
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <h2 style={{ margin: 0 }}>Employee List</h2>

        <Link
          to="/employees/add"
          style={{
            background: "#0d6efd",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Add Employee
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 2fr 1fr",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ced4da",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            background: "#198754",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        <select
          value={selectedDepartment}
          onChange={(e) => handleDepartmentFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ced4da",
          }}
        >
          <option value="">All Departments</option>

          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleReset}
          style={{
            background: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      {loading ? (
        <h4 style={{ textAlign: "center" }}>Loading employees...</h4>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#0d6efd", color: "#fff" }}>
                <th style={{ padding: "12px" }}>Employee ID</th>
                <th style={{ padding: "12px" }}>Name</th>
                <th style={{ padding: "12px" }}>Email</th>
                <th style={{ padding: "12px" }}>Phone</th>
                <th style={{ padding: "12px" }}>Position</th>
                <th style={{ padding: "12px" }}>Department</th>
                <th style={{ padding: "12px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee._id}>
                    <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{employee.employeeId}</td>
                    <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{employee.name}</td>
                    <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{employee.email}</td>
                    <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{employee.phone}</td>
                    <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{employee.position}</td>
                    <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{employee.department?.name || "N/A"}</td>

                    <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                      <Link
                        to={`/employees/${employee._id}`}
                        style={{ marginRight: "8px" }}
                      >
                        View
                      </Link>

                      <Link
                        to={`/employees/edit/${employee._id}`}
                        style={{ marginRight: "8px" }}
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(employee._id)}
                        style={{
                          background: "#dc3545",
                          color: "#fff",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;