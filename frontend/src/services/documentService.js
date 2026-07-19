import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach JWT Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Upload Document
export const uploadDocument = async (formData) => {
  const response = await API.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get All Documents
export const getDocuments = async (employeeId) => {
  const response = await API.get(`/documents/employee/${employeeId}`);

  return response.data;
};

// Download Document
export const downloadDocument = async (id) => {
  const response = await API.get(`/documents/download/${id}`, {
    responseType: "blob",
  });

  return response;
};

// Delete Document
export const deleteDocument = async (id) => {
  const response = await API.delete(`/documents/${id}`);

  return response.data;
};