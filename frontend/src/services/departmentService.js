import axiosInstance from "./axios";

// Get All Departments
export const getDepartments = async () => {
  const response = await axiosInstance.get("/departments");
  return response.data;
};

// Get Single Department
export const getDepartmentById = async (id) => {
  const response = await axiosInstance.get(`/departments/${id}`);
  return response.data;
};

// Create Department
export const createDepartment = async (departmentData) => {
  const response = await axiosInstance.post("/departments", departmentData);
  return response.data;
};

// Update Department
export const updateDepartment = async (id, departmentData) => {
  const response = await axiosInstance.put(
    `/departments/${id}`,
    departmentData
  );
  return response.data;
};

// Delete Department
export const deleteDepartment = async (id) => {
  const response = await axiosInstance.delete(`/departments/${id}`);
  return response.data;
};

// Search Departments
export const searchDepartments = async (keyword) => {
  const response = await axiosInstance.get(
    `/departments/search?keyword=${keyword}`
  );
  return response.data;
};