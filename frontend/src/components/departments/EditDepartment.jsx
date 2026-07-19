import { useState } from "react";
import axiosInstance from "../../services/axios";

function EditDepartment() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axiosInstance.put(
      `/departments/${formData.id}`,
      {
        name: formData.name,
        description: formData.description,
      }
    );

    alert(response.data.message);

    console.log(response.data);

    setFormData({
      id: "",
      name: "",
      description: "",
    });
  } catch (error) {
    alert(error.response?.data?.message || "Failed to update department");
  }
};

  return (
    <div>
      <h2>Edit Department</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Department ID"
          value={formData.id}
          onChange={(e) =>
            setFormData({
              ...formData,
              id: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Department Name"
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
          placeholder="Description"
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

        <button type="submit">Update Department</button>
      </form>
    </div>
  );
}

export default EditDepartment;