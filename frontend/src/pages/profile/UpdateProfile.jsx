import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getMyProfile,
  updateProfile,
} from "../../services/profileService";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();

      setFormData({
        name: data.user.name,
        email: data.user.email,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
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
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Full name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await updateProfile(formData);

      toast.success(res.message);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Update failed"
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
          Update Profile
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
            <label
              style={{
                fontWeight: "600",
              }}
            >
              Full Name
            </label>

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

            {errors.name && (
              <p
                style={{
                  color: "red",
                  marginTop: "5px",
                }}
              >
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              style={{
                fontWeight: "600",
              }}
            >
              Email
            </label>

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

            {errors.email && (
              <p
                style={{
                  color: "red",
                  marginTop: "5px",
                }}
              >
                {errors.email}
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
            {loading ? "Updating Profile..." : "Update Profile"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default UpdateProfile;