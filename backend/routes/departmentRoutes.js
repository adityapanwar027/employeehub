const express = require("express");
const {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, authorize("Admin"), createDepartment);

router.get("/", protect, getDepartments);

router.get("/:id", protect, getDepartment);

router.put("/:id", protect, authorize("Admin"), updateDepartment);

router.delete("/:id", protect, authorize("Admin"), deleteDepartment);

module.exports = router;