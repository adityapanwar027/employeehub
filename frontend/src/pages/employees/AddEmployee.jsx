import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data.departments);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Employee name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Employee name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!formData.salary) {
      newErrors.salary = "Salary is required";
    } else if (Number(formData.salary) <= 0) {
      newErrors.salary = "Salary must be greater than 0";
    }

    if (!formData.department) {
      newErrors.department = "Please select a department";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await createEmployee(formData);

      toast.success("Employee added successfully");

      navigate("/employees");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to create employee"
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
        Add Employee
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
            placeholder="Enter employee name"
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

          {errors.name && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.name}</p>
          )}
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter email"
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

          {errors.email && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.email}</p>
          )}
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Phone</label>

          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
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

          {errors.phone && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.phone}</p>
          )}
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Position</label>

          <input
            type="text"
            name="position"
            placeholder="Enter position"
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

          {errors.position && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.position}</p>
          )}
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Salary</label>

          <input
            type="number"
            name="salary"
            placeholder="Enter salary"
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

          {errors.salary && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.salary}</p>
          )}
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

          {errors.department && (
            <p style={{ color: "red", marginTop: "5px" }}>
              {errors.department}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "12px",
            background: "#0d6efd",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Adding Employee..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;