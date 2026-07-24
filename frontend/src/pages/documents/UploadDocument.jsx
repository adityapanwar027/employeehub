import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
import DashboardLayout from "../../layouts/DashboardLayout";
import DocumentForm from "../../components/documents/DocumentForm";
import "./UploadDocument.css";

const UploadDocument = () => {
  return (
    <DashboardLayout>
      <motion.div
        className="upload-page"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="upload-header">
          <div>
            <h1>Upload Document</h1>
            <p>
              Upload employee documents securely to EmployeeHub.
            </p>
          </div>

          <div className="upload-icon">
            <FaCloudUploadAlt />
          </div>
        </div>

        <div className="upload-card">
          <DocumentForm />
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default UploadDocument;