import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data.departments);
    } catch (error) {
      console.error(error);
      alert("Failed to load departments");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.position ||
      !formData.salary ||
      !formData.department
    ) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      await createEmployee(formData);

      alert("Employee added successfully");

      navigate("/employees");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Failed to create employee"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Employee</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Employee Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter employee name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            type="text"
            name="position"
            className="form-control"
            placeholder="Enter position"
            value={formData.position}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            name="salary"
            className="form-control"
            placeholder="Enter salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Department</label>

          <select
            name="department"
            className="form-select"
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
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;