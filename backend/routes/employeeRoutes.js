const express = require("express");
const { body } = require("express-validator");

const validateRequest = require("../middleware/validationMiddleware");

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

router.post(
  "/",
  protect,
  authorize("Admin"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("position").notEmpty().withMessage("Position is required"),
    body("department").notEmpty().withMessage("Department is required"),
    body("salary").notEmpty().withMessage("Salary is required"),
  ],
  validateRequest,
  createEmployee
);

router.get("/", protect, getEmployees);

router.get("/search", protect, searchEmployees);

router.get("/department/:departmentId", protect, filterByDepartment);

router.get("/:id", protect, getEmployee);

router.put("/:id", protect, authorize("Admin"), updateEmployee);

router.delete("/:id", protect, authorize("Admin"), deleteEmployee);

module.exports = router;