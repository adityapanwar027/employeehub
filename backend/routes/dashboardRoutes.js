const express = require("express");
const {
  getDashboardStats,
  getRecentEmployees,
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, getDashboardStats);

router.get("/recent-employees", protect, getRecentEmployees);

module.exports = router;