const express = require("express");
const {
  getMyProfile,
  updateProfile,
  changePassword,
  uploadProfilePicture,
} = require("../controllers/profileController");

const protect = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get My Profile
router.get("/me", protect, getMyProfile);

// Update Profile
router.put("/update", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);

// Upload Profile Picture
router.post(
  "/upload-picture",
  protect,
  upload.single("profilePicture"),
  uploadProfilePicture
);

module.exports = router;