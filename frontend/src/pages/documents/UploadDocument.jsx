import DashboardLayout from "../../layouts/DashboardLayout";
import DocumentForm from "../../components/documents/DocumentForm";

const UploadDocument = () => {
  return (
    <DashboardLayout>
      <div
        style={{
          maxWidth: "700px",
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
          Upload Document
        </h2>

        <DocumentForm />
      </div>
    </DashboardLayout>
  );
};

export default UploadDocument;