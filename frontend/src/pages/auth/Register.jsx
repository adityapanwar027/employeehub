import { useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] =useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Password Validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await axiosInstance.post("/auth/register", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success(response.data.message || "Registration Successful");

setTimeout(() => {
  navigate("/dashboard");
}, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="login-container">
    <form onSubmit={handleSubmit} className="login-card">
      <h2 className="login-title">Register</h2>

      <label className="login-label">Full Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
        className="login-input"
      />

      {errors.name && <p className="error-text">{errors.name}</p>}

      <label className="login-label">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        className="login-input"
      />

      {errors.email && <p className="error-text">{errors.email}</p>}

      <label className="login-label">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        className="login-input"
      />

      {errors.password && <p className="error-text">{errors.password}</p>}

      <button
        type="submit"
        disabled={loading}
        className="login-btn"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <div className="login-footer">
        Already have an account?{" "}
        <span
          style={{ color: "#0d6efd", cursor: "pointer", fontWeight: "600" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </div>
    </form>
  </div>
);
}

export default Register;