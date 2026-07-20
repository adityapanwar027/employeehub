import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  getDocuments,
  downloadDocument,
  deleteDocument,
} from "../../services/documentService";

const DocumentList = () => {
  const { employeeId } = useParams();

  const [documents, setDocuments] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data = await getDocuments(employeeId);
      setDocuments(data.documents);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load documents");
    }
  };

  const handleDownload = async (id, fileName) => {
    try {
      setLoadingId(id);

      const response = await downloadDocument(id);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Download started");
    } catch (error) {
      toast.error("Download failed");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document?")) return;

    try {
      setLoadingId(id);

      await deleteDocument(id);

      toast.success("Document deleted");

      loadDocuments();
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          fontWeight: "bold",
          color: "#212529",
        }}
      >
        Employee Documents
      </h2>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              <th style={thStyle}>Document Name</th>
              <th style={thStyle}>File Name</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Size (KB)</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <tr key={doc._id}>
                  <td style={tdStyle}>{doc.documentName}</td>
                  <td style={tdStyle}>{doc.fileName}</td>
                  <td style={tdStyle}>{doc.fileType}</td>
                  <td style={tdStyle}>
                    {(doc.fileSize / 1024).toFixed(2)}
                  </td>

                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        handleDownload(doc._id, doc.fileName)
                      }
                      disabled={loadingId === doc._id}
                      style={{
                        marginRight: "10px",
                        padding: "8px 14px",
                        background: "#198754",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor:
                          loadingId === doc._id
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      Download
                    </button>

                    <button
                      onClick={() => handleDelete(doc._id)}
                      disabled={loadingId === doc._id}
                      style={{
                        padding: "8px 14px",
                        background: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor:
                          loadingId === doc._id
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "14px",
  textAlign: "left",
  borderBottom: "2px solid #dee2e6",
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #dee2e6",
};

export default DocumentList;