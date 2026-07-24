import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaFileAlt,
  FaUserTie,
} from "react-icons/fa";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";
import { uploadDocument } from "../../services/documentService";
import "./DocumentForm.css";

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
      toast.error(
        error.response?.data?.message ||
          "Failed to load employees"
      );
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

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
      formData.append(
        "documentName",
        documentName
      );
      formData.append("document", document);

      await uploadDocument(formData);

      toast.success(
        "Document uploaded successfully"
      );

      setEmployee("");
      setDocumentName("");
      setDocument(null);

      e.target.reset();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };
    return (
    <motion.form
      className="document-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="form-group">
        <label>
          <FaUserTie />
          Employee
        </label>

        <select
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          className="form-input"
        >
          <option value="">Select Employee</option>

          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
          <FaFileAlt />
          Document Name
        </label>

        <input
          type="text"
          placeholder="Enter document name"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>
          <FaCloudUploadAlt />
          Upload Document
        </label>

        <div className="upload-box">
          <FaCloudUploadAlt className="upload-icon" />

          <p>Choose a document to upload</p>

          <input
            type="file"
            onChange={(e) => setDocument(e.target.files[0])}
            className="file-input"
          />
        </div>
      </div>

      {document && (
        <motion.div
          className="selected-file"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaFileAlt className="file-preview-icon" />

          <div>
            <strong>{document.name}</strong>

            <p>
              {(document.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="upload-btn"
      >
        <FaCloudUploadAlt />

        {loading ? "Uploading..." : "Upload Document"}
      </button>
    </motion.form>
  );
};

export default DocumentForm;