import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";

import {
  getEmployees,
  deleteEmployee,
  searchEmployees,
  getEmployeesByDepartment,
} from "../../services/employeeService";

import { getDepartments } from "../../services/departmentService";

import "./EmployeeList.css";

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
      toast.error("Failed to load employees");
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
      toast.error("Search failed");
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
      toast.error("Filter failed");
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
    if (
      !window.confirm(
        "Are you sure you want to delete this employee?"
      )
    )
      return;

    try {
      await deleteEmployee(id);

      toast.success("Employee deleted successfully");

      loadEmployees();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete employee"
      );
    }
  };

    return (
    <motion.div
      className="employee-page"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="employee-header">
        <div>
          <h1>Employees</h1>
          <p>Manage all employees in EmployeeHub</p>
        </div>

        <Link to="/employees/add" className="add-btn">
          <FaPlus />
          Add Employee
        </Link>
      </div>

      <div className="employee-toolbar">
        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>

        <select
          className="department-select"
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

        <button
          className="reset-btn"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {loading ? (
        <div className="loading">
          Loading employees...
        </div>
      ) : (
        <div className="table-card">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>
                      <div className="employee-info">
                        <div className="employee-avatar">
                          <FaUserCircle />
                        </div>

                        <div>
                          <h4>{employee.name}</h4>

                          <span>
                            {employee.employeeId}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>{employee.email}</td>

                    <td>{employee.phone}</td>

                    <td>{employee.position}</td>

                    <td>
                      <span className="department-badge">
                        {employee.department?.name ||
                          "N/A"}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/employees/${employee._id}`}
                          className="view-btn"
                        >
                          <FaEye />
                        </Link>

                        <Link
                          to={`/employees/edit/${employee._id}`}
                          className="edit-btn"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(employee._id)
                          }
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="no-data"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default EmployeeList;