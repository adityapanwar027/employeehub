import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBuilding,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../services/departmentService";

import "./DepartmentList.css";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredDepartments(departments);
      return;
    }

    setFilteredDepartments(
      departments.filter((department) =>
        department.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, departments]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const data = await getDepartments();

      setDepartments(data.departments);
      setFilteredDepartments(data.departments);
    } catch (error) {
      toast.error("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Department name is required");
      return;
    }

    try {
      if (editingId) {
        await updateDepartment(editingId, formData);

        toast.success("Department updated successfully");
      } else {
        await createDepartment(formData);

        toast.success("Department created successfully");
      }

      setFormData({
        name: "",
        description: "",
      });

      setEditingId(null);

      fetchDepartments();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation failed"
      );
    }
  };

  const handleEdit = (department) => {
    setEditingId(department._id);

    setFormData({
      name: department.name,
      description: department.description,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this department?"
      )
    )
      return;

    try {
      await deleteDepartment(id);

      toast.success("Department deleted");

      fetchDepartments();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

    const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <DashboardLayout>
      <motion.div
        className="department-page"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="department-header">
          <div>
            <h1>Departments</h1>
            <p>Manage all departments in EmployeeHub</p>
          </div>
        </div>

        <div className="department-form-card">
          <h3>
            <FaBuilding />
            {editingId ? " Edit Department" : " Add Department"}
          </h3>

          <div className="department-form">
            <input
              type="text"
              name="name"
              placeholder="Department Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="description"
              placeholder="Department Description"
              value={formData.description}
              onChange={handleChange}
            />

            <div className="form-buttons">
              <button
                className="save-btn"
                onClick={handleSubmit}
              >
                <FaPlus />
                {editingId ? " Update" : " Add"}
              </button>

              {editingId && (
                <button
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  <FaTimes />
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="search-card">
          <div className="search-box">
            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search Department..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        <div className="department-table-card">
          {loading ? (
            <div className="loading">
              Loading departments...
            </div>
          ) : (
            <table className="department-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th width="180">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map(
                    (department) => (
                      <tr key={department._id}>
                        <td>
                          <div className="department-name">
                            <FaBuilding />
                            {department.name}
                          </div>
                        </td>

                        <td>
                          {department.description}
                        </td>

                        <td>
                          <div className="action-buttons">
                            <button
                              className="edit-btn"
                              onClick={() =>
                                handleEdit(
                                  department
                                )
                              }
                            >
                              <FaEdit />
                            </button>

                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(
                                  department._id
                                )
                              }
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="no-data"
                    >
                      No departments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default DepartmentList;