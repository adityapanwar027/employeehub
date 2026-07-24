const express = require("express");

const {
  uploadDocument,
  getEmployeeDocuments,
  downloadDocument,
  deleteDocument,
} = require("../controllers/documentController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

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