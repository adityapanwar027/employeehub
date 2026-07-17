const express = require("express");
const {
  register,
  login,
  getProfile,
  adminOnly,
  changePassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/change-password", protect, changePassword);

router.get(
  "/admin",
  protect,
  authorize("Admin"),
  adminOnly
);

module.exports = router;