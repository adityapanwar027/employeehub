const Employee = require("../models/Employee");
const Department = require("../models/Department");
const User = require("../models/User");

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalEmployees,
        totalDepartments,
        totalUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Recent Employees
const getRecentEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("department")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentEmployees,
};