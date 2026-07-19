import { useEffect, useState } from "react";
import axios from "axios";
import { uploadDocument } from "../../services/documentService";

const DocumentForm = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployees(data.employees || data);
    } catch (error) {
      console.error(error);
      alert("Failed to load employees");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee || !documentName || !document) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("employee", employee);
      formData.append("documentName", documentName);
      formData.append("document", document);

      await uploadDocument(formData);

      alert("Document uploaded successfully");

      setEmployee("");
      setDocumentName("");
      setDocument(null);

      e.target.reset();
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow p-4">
      <h3 className="mb-4">Upload Document</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Employee</label>

          <select
            className="form-select"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>

            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Document Name</label>

          <input
            type="text"
            className="form-control"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            placeholder="Enter document name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Choose Document</label>

          <input
            type="file"
            className="form-control"
            onChange={(e) => setDocument(e.target.files[0])}
          />
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default DocumentForm;