import axiosInstance from "./axios";

// Upload Document
export const uploadDocument = async (formData) => {
  const response = await axiosInstance.post(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get Employee Documents
export const getDocuments = async (employeeId) => {
  const response = await axiosInstance.get(
    `/documents/employee/${employeeId}`
  );

  return response.data;
};

// Download Document
export const downloadDocument = async (id) => {
  const response = await axiosInstance.get(
    `/documents/download/${id}`,
    {
      responseType: "blob",
    }
  );

  return response;
};

// Delete Document
export const deleteDocument = async (id) => {
  const response = await axiosInstance.delete(`/documents/${id}`);

  return response.data;
};