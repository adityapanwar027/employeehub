import { useState } from "react";
import axiosInstance from "../../services/axios";

function AddDepartment() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/departments", formData);

      alert(response.data.message);

      console.log(response.data);

      setFormData({
        name: "",
        description: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create department");
    }
  };

  return (
    <div>
      <h2>Add Department</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Department Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Enter Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />

        <br />
        <br />

        <button type="submit">Add Department</button>
      </form>
    </div>
  );
}

export default AddDepartment;