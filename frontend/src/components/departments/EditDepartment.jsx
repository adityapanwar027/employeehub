import { useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";

function EditDepartment() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `/departments/${formData.id}`,
        {
          name: formData.name,
          description: formData.description,
        }
      );

      toast.success(response.data.message);

      setFormData({
        id: "",
        name: "",
        description: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update department"
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
        Edit Department
      </h3>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          name="id"
          placeholder="Department ID"
          value={formData.id}
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

        <input
          type="text"
          name="name"
          placeholder="Department Name"
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

        <input
          type="text"
          name="description"
          placeholder="Description"
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

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: "#ffc107",
            color: "#212529",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          {loading ? "Updating Department..." : "Update Department"}
        </button>
      </form>
    </div>
  );
}

export default EditDepartment;