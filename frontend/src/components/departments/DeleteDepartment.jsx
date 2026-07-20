import { useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";

function DeleteDepartment() {
  const [departmentId, setDepartmentId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!departmentId.trim()) {
      toast.error("Department ID is required");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.delete(
        `/departments/${departmentId}`
      );

      toast.success(response.data.message);

      setDepartmentId("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete department"
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
        Delete Department
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
          placeholder="Department ID"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
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
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          {loading ? "Deleting Department..." : "Delete Department"}
        </button>
      </form>
    </div>
  );
}

export default DeleteDepartment;