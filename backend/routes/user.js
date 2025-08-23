import { Router } from "express";
import { protect } from "../middleware/auth.js";
import * as userController from "../controllers/userController.js";

const router = Router();

// Get user profile
router.get("/profile", protect, userController.getUserProfile);

// Update user profile
router.put("/profile", protect, userController.updateUserProfile);

export default router;
