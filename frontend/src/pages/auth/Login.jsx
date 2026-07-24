import axiosInstance from "../../services/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

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

      const response = await axiosInstance.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("Token:", localStorage.getItem("token"));
      console.log("User:", JSON.parse(localStorage.getItem("user")));

      toast.success(response.data.message || "Login Successful");

setTimeout(() => {
  navigate("/dashboard");
}, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="login-container">
    <form onSubmit={handleSubmit} className="login-card">
      <h2 className="login-title">Employee Login</h2>

      <label className="login-label">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        className="login-input"
      />

      {errors.email && (
        <p className="error-text">{errors.email}</p>
      )}

      <label className="login-label">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        className="login-input"
      />

      {errors.password && (
        <p className="error-text">{errors.password}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="login-btn"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="login-footer">
        Don't have an account?{" "}
        <span
          style={{ color: "#0d6efd", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </div>
    </form>
  </div>
);
}

export default Login;