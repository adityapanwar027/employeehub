import { useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../../layouts/DashboardLayout";
import { changePassword } from "../../services/profileService";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword =
        "New password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (
      formData.newPassword !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success(res.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setErrors({});
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
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
          Change Password
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <label style={{ fontWeight: "600" }}>
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
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

            {errors.currentPassword && (
              <p style={{ color: "red", marginTop: "5px" }}>
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div>
            <label style={{ fontWeight: "600" }}>
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
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

            {errors.newPassword && (
              <p style={{ color: "red", marginTop: "5px" }}>
                {errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <label style={{ fontWeight: "600" }}>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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

            {errors.confirmPassword && (
              <p style={{ color: "red", marginTop: "5px" }}>
                {errors.confirmPassword}
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
            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;