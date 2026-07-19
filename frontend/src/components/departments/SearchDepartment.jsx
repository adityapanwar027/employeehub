import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";

function SearchDepartment() {
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState([]);


const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get("/departments");
      setDepartments(response.data.departments);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Search Department</h2>

      <input
        type="text"
        placeholder="Search Department"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      {filteredDepartments.map((department) => (
        <div key={department._id}>
          <strong>{department.name}</strong> - {department.description}
        </div>
      ))}
    </div>
  );
}

export default SearchDepartment;