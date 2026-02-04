import { Router } from "express";
import * as jobController from "../controllers/jobController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// Job Provider routes (protected)
router.post("/", authMiddleware, jobController.postJob);
router.get("/provider/jobs", authMiddleware, jobController.getProviderJobs);
router.get("/:jobId", jobController.getJobDetails);
router.put("/:jobId/status", authMiddleware, jobController.updateJobStatus);
router.delete("/:jobId", authMiddleware, jobController.deleteJob);
router.get("/:jobId/applications", authMiddleware, jobController.getJobApplications);
router.put("/application/:applicationId", authMiddleware, jobController.updateApplicationStatus);

// Job Seeker routes
router.post("/save", authMiddleware, jobController.saveJob);
router.get("/saved/jobs", authMiddleware, jobController.getSavedJobs);

export default router;
