import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";
import { uploadDocument } from "../../services/documentService";

const DocumentForm = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

 const fetchEmployees = async () => {
  try {
    const { data } = await axiosInstance.get("/employees");
    setEmployees(data.employees);
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to load employees");
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee || !documentName || !document) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("employee", employee);
      formData.append("documentName", documentName);
      formData.append("document", document);

      await uploadDocument(formData);

      toast.success("Document uploaded successfully");

      setEmployee("");
      setDocumentName("");
      setDocument(null);

      e.target.reset();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          Employee
        </label>

        <select
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ced4da",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        >
          <option value="">Select Employee</option>

          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          Document Name
        </label>

        <input
          type="text"
          placeholder="Enter document name"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ced4da",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          Choose Document
        </label>

        <input
          type="file"
          onChange={(e) => setDocument(e.target.files[0])}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {document && (
        <p
          style={{
            margin: 0,
            color: "#6c757d",
            fontSize: "14px",
          }}
        >
          Selected: <strong>{document.name}</strong>
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
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
        {loading ? "Uploading..." : "Upload Document"}
      </button>
    </form>
  );
};

export default DocumentForm;