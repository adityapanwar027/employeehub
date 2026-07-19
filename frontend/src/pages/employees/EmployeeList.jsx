import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, []);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data.employees);
    } catch (error) {
      console.error(error);
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
      const data = await searchEmployees(search);
      setEmployees(data.employees);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDepartmentFilter = async (departmentId) => {
    setSelectedDepartment(departmentId);

    if (!departmentId) {
      loadEmployees();
      return;
    }

    try {
      const data = await getEmployeesByDepartment(departmentId);
      setEmployees(data.employees);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setSearch("");
    setSelectedDepartment("");
    loadEmployees();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);
      alert("Employee deleted successfully");
      loadEmployees();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete employee");
    }
  };

  return (
  <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2>Employee List</h2>

      <Link to="/employees/add" className="btn btn-primary">
        Add Employee
      </Link>
    </div>

    {/* Search & Filter */}
    <div className="row mb-3">
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="col-md-2">
        <button
          className="btn btn-success w-100"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          value={selectedDepartment}
          onChange={(e) =>
            handleDepartmentFilter(e.target.value)
          }
        >
          <option value="">All Departments</option>

          {departments.map((department) => (
            <option
              key={department._id}
              value={department._id}
            >
              {department.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <button
          className="btn btn-secondary w-100"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>

    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Position</th>
          <th>Department</th>
          <th width="280">Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.employeeId}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.position}</td>
              <td>{employee.department?.name || "N/A"}</td>

              <td>
                <Link
                  to={`/employees/${employee._id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  View
                </Link>

                <Link
                  to={`/employees/edit/${employee._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(employee._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              No employees found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
}
export default EmployeeList;