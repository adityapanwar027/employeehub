import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
    department: "",
  });

//   useEffect(() => {
//     loadDepartments();
//     loadEmployee();
//   }, []);

  async function loadDepartments() {
    try {
      const data = await getDepartments();
      setDepartments(data.departments);
    } catch (error) {
      console.error(error);
    }
  };

  async function loadEmployee() {
    try {
      const data = await getEmployeeById(id);

      setFormData({
        name: data.employee.name,
        email: data.employee.email,
        phone: data.employee.phone,
        position: data.employee.position,
        salary: data.employee.salary,
        department: data.employee.department?._id || "",
      });

      
    } catch (error) {
      console.error(error);
      alert("Failed to load employee");
    }
  };

   useEffect(() => {
    loadDepartments();
    loadEmployee();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateEmployee(id, formData);

      alert("Employee updated successfully");

      navigate("/employees");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update employee"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Employee Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Department</label>

          <select
            className="form-select"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>

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

        <button
          type="submit"
          className="btn btn-warning"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Employee"}
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;