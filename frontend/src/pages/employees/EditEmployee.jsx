import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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

  useEffect(() => {
    loadDepartments();
    loadEmployee();
  }, []);

  async function loadDepartments() {
    try {
      const data = await getDepartments();
      setDepartments(data.departments);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments");
    }
  }

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
      toast.error("Failed to load employee");
    }
  }

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

      toast.success("Employee updated successfully");

      navigate("/employees");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to update employee"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
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
        Edit Employee
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div>
          <label style={{ fontWeight: "600" }}>Employee Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Phone</label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Position</label>

          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Salary</label>

          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Department</label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          >
            <option value="">Select Department</option>

            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "12px",
            background: "#ffc107",
            color: "#212529",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Updating Employee..." : "Update Employee"}
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;