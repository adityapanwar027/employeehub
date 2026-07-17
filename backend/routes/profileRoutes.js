const express = require("express");
const {
  updateProfile,
  uploadProfilePicture,
} = require("../controllers/profileController");

const protect = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put("/update", protect, updateProfile);

router.post(
  "/upload-picture",
  protect,
  upload.single("profilePicture"),
  uploadProfilePicture
);

module.exports = router;