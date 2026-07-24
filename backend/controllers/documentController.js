const Document = require("../models/Document");
const uploadToAzure = require("../utils/uploadToAzure");

// Upload Document
const uploadDocument = async (req, res) => {
  try {
    const { employee, documentName } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document",
      });
    }

    const fileUrl = await uploadToAzure(req.file);

    const document = await Document.create({
      employee,
      documentName,
      fileName: req.file.originalname,
      filePath: fileUrl,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    });

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Employee Documents
const getEmployeeDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      employee: req.params.employeeId,
    });

    res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Download Document
const downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      fileUrl: document.filePath,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Document
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  getEmployeeDocuments,
  downloadDocument,
  deleteDocument,
};