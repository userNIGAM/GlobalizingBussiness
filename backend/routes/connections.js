import { Router } from "express";
import * as connectionController from "../controllers/connectionController.js";

const router = Router();

// Create a connection
router.post("/", connectionController.createConnection);

// Get user connections
router.get("/:userId", connectionController.getUserConnections);

// Check if users are connected
router.get("/check/status", connectionController.checkConnection);

// Remove connection
router.delete("/", connectionController.removeConnection);

export default router;
