import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";

function SearchDepartment() {
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/departments");
      setDepartments(response.data.departments);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch departments"
      );
    } finally {
      setLoading(false);
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
      <h3
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Search Department
      </h3>

      <input
        type="text"
        placeholder="Search Department"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          border: "1px solid #ced4da",
          borderRadius: "8px",
          fontSize: "15px",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
      />

      {loading ? (
        <p>Loading departments...</p>
      ) : filteredDepartments.length > 0 ? (
        filteredDepartments.map((department) => (
          <div
            key={department._id}
            style={{
              background: "#f8f9fa",
              border: "1px solid #dee2e6",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h4
              style={{
                margin: "0 0 8px",
                color: "#0d6efd",
              }}
            >
              {department.name}
            </h4>

            <p
              style={{
                margin: 0,
                color: "#495057",
              }}
            >
              {department.description}
            </p>
          </div>
        ))
      ) : (
        <p>No departments found.</p>
      )}
    </div>
  );
}

export default SearchDepartment;