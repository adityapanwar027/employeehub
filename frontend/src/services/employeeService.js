import axiosInstance from "./axios";

// Get All Employees
export const getEmployees = async () => {
  const response = await axiosInstance.get("/employees");
  return response.data;
};

// Search Employees
export const searchEmployees = async (keyword) => {
  const response = await axiosInstance.get(
    `/employees/search?keyword=${keyword}`
  );
  return response.data;
};

// Filter Employees by Department
export const getEmployeesByDepartment = async (departmentId) => {
  const response = await axiosInstance.get(
    `/employees/department/${departmentId}`
  );
  return response.data;
};

// Create Employee
export const createEmployee = async (employeeData) => {
  const response = await axiosInstance.post("/employees", employeeData);
  return response.data;
};

// Get Employee By ID
export const getEmployeeById = async (id) => {
  const response = await axiosInstance.get(`/employees/${id}`);
  return response.data;
};

// Update Employee
export const updateEmployee = async (id, employeeData) => {
  const response = await axiosInstance.put(`/employees/${id}`, employeeData);
  return response.data;
};

// Delete Employee
export const deleteEmployee = async (id) => {
  const response = await axiosInstance.delete(`/employees/${id}`);
  return response.data;
};