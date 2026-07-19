import axiosInstance from "./axios";

// Get All Departments
export const getDepartments = async () => {
  const response = await axiosInstance.get("/departments");
  return response.data;
};