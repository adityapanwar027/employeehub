import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDocuments,
  downloadDocument,
  deleteDocument,
} from "../../services/documentService";

const DocumentList = () => {
  const { employeeId } = useParams();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data = await getDocuments(employeeId);
      setDocuments(data.documents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async (id, fileName) => {
    try {
      const response = await downloadDocument(id);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Download failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document?")) return;

    try {
      await deleteDocument(id);
      loadDocuments();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Employee Documents</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Document Name</th>
            <th>File Name</th>
            <th>Type</th>
            <th>Size (KB)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {documents.length > 0 ? (
            documents.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.documentName}</td>
                <td>{doc.fileName}</td>
                <td>{doc.fileType}</td>
                <td>{(doc.fileSize / 1024).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() =>
                      handleDownload(doc._id, doc.fileName)
                    }
                  >
                    Download
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(doc._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No documents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;