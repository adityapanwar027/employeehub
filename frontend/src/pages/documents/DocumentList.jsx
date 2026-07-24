import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaDownload,
  FaTrash,
  FaFolderOpen,
} from "react-icons/fa";

import {
  getDocuments,
  downloadDocument,
  deleteDocument,
} from "../../services/documentService";

import "./DocumentList.css";

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

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

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
    if (!window.confirm("Delete this document?"))
      return;

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

  const getFileIcon = (type = "") => {
    const fileType = type.toLowerCase();

    if (fileType.includes("pdf"))
      return <FaFilePdf className="pdf" />;

    if (
      fileType.includes("word") ||
      fileType.includes("doc")
    )
      return <FaFileWord className="word" />;

    if (
      fileType.includes("excel") ||
      fileType.includes("sheet") ||
      fileType.includes("xls")
    )
      return <FaFileExcel className="excel" />;

    if (fileType.includes("image"))
      return <FaFileImage className="image" />;

    return <FaFileAlt className="file" />;
  };
    const totalSize = documents.reduce(
    (sum, doc) => sum + (doc.fileSize || 0),
    0
  );

  return (
    <motion.div
      className="document-page"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="document-header">
        <div>
          <h1>Employee Documents</h1>
          <p>Manage employee files and records</p>
        </div>
      </div>

      <div className="document-stats">

        <div className="stat-card">
          <FaFolderOpen className="stat-icon" />
          <div>
            <h2>{documents.length}</h2>
            <span>Total Documents</span>
          </div>
        </div>

        <div className="stat-card">
          <FaFileAlt className="stat-icon" />
          <div>
            <h2>{(totalSize / 1024).toFixed(2)} KB</h2>
            <span>Total Storage</span>
          </div>
        </div>

      </div>

      <div className="document-table-card">

        <table className="document-table">

          <thead>
            <tr>
              <th>Document</th>
              <th>File Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {documents.length > 0 ? (
              documents.map((doc) => (
                <tr key={doc._id}>

                  <td>
                    <div className="document-name">
                      {getFileIcon(doc.fileType)}

                      <div>
                        <h4>{doc.documentName}</h4>
                      </div>
                    </div>
                  </td>

                  <td>{doc.fileName}</td>

                  <td>{doc.fileType}</td>

                  <td>
                    {(doc.fileSize / 1024).toFixed(2)} KB
                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="download-btn"
                        disabled={loadingId === doc._id}
                        onClick={() =>
                          handleDownload(
                            doc._id,
                            doc.fileName
                          )
                        }
                      >
                        <FaDownload />
                      </button>

                      <button
                        className="delete-btn"
                        disabled={loadingId === doc._id}
                        onClick={() =>
                          handleDelete(doc._id)
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="no-data"
                >
                  No documents found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </motion.div>
  );
};

export default DocumentList;