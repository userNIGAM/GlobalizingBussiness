import express from "express";
import {
  submitKYC,
  getKYCStatus,
  getAllKYC,
  updateKYCStatus,
  getKYCDocument,
  updateKYC,
  upload,
} from "../controllers/kycController.js";
import { protect } from "../middleware/auth.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// Configure multer for multiple files
const uploadFields = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "idDocument", maxCount: 1 },
  { name: "addressProof", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

// Submit KYC application
router.post("/submit", protect, uploadFields, submitKYC);

// Get user's KYC status
router.get("/status", protect, getKYCStatus);

// Update user's own KYC information
router.put("/update", protect, updateKYC);

// Get all KYC applications (admin only)
router.get("/admin/applications", protect, adminAuth, getAllKYC);

// Update KYC status (admin only)
router.put("/admin/:id/status", protect, adminAuth, updateKYCStatus);

// Get KYC document (admin only)
router.get(
  "/admin/:id/document/:documentType",
  protect,
  adminAuth,
  getKYCDocument
);

export default router;
