import { useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";

function AddDepartment() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Department name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Department name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axiosInstance.post("/departments", formData);

      toast.success(response.data.message);

      setFormData({
        name: "",
        description: "",
      });

      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create department"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Add Department
      </h3>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter Department Name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />

          {errors.name && (
            <p
              style={{
                color: "red",
                marginTop: "5px",
                fontSize: "14px",
              }}
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="description"
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />

          {errors.description && (
            <p
              style={{
                color: "red",
                marginTop: "5px",
                fontSize: "14px",
              }}
            >
              {errors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: "#0d6efd",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          {loading ? "Adding Department..." : "Add Department"}
        </button>
      </form>
    </div>
  );
}

export default AddDepartment;