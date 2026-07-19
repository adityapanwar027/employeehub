import { useState } from "react";
import axiosInstance from "../../services/axios";

function DeleteDepartment() {
  const [departmentId, setDepartmentId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.delete(
        `/departments/${departmentId}`
      );

      alert(response.data.message);

      console.log(response.data);

      setDepartmentId("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete department");
    }
  };

  return (
    <div>
      <h2>Delete Department</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Department ID"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Delete Department
        </button>
      </form>
    </div>
  );
}

export default DeleteDepartment;