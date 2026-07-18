const express = require("express");
const multer = require("multer");

const {
  uploadDocument,
  getEmployeeDocuments,
  downloadDocument,
  deleteDocument,
} = require("../controllers/documentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/documents");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  protect,
  upload.single("document"),
  uploadDocument
);

router.get("/employee/:employeeId", protect, getEmployeeDocuments);

router.get("/download/:id", protect, downloadDocument);

router.delete("/:id", protect, deleteDocument);

module.exports = router;