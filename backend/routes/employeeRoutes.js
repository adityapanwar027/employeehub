const express = require("express");
const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
  filterByDepartment,
} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, authorize("Admin"), createEmployee);

router.get("/", protect, getEmployees);

router.get("/search", protect, searchEmployees);

router.get("/department/:departmentId", protect, filterByDepartment);

router.get("/:id", protect, getEmployee);

router.put("/:id", protect, authorize("Admin"), updateEmployee);

router.delete("/:id", protect, authorize("Admin"), deleteEmployee);

module.exports = router;