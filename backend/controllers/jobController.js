import User from "../models/User.js";
import Job from "../models/Jobs.js";

// Job Provider - Post a new job
export const postJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, location, type, description, requirements, responsibilities, salaryRange, applicationDeadline } = req.body;

    // Get company from user profile
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newJob = new Job({
      title,
      company: user.companyName || user.fullName || "Company",
      location,
      type,
      description,
      requirements: Array.isArray(requirements) ? requirements : [requirements],
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [responsibilities],
      salaryRange,
      applicationDeadline,
      postedBy: userId,
    });

    await newJob.save();

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Error in postJob controller:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all jobs posted by a provider
export const getProviderJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const jobs = await Job.find({ postedBy: userId }).sort({ postedDate: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Error in getProviderJobs controller:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get single job details
export const getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate("applications");

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error in getJobDetails controller:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update job status
export const updateJobStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;
    const { status } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    job.status = status;
    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job status updated",
      job,
    });
  } catch (error) {
    console.error("Error in updateJobStatus controller:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Job.deleteOne({ _id: jobId });

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteJob controller:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Approve/Reject application
export const updateApplicationStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { applicationId } = req.params;
    const { status } = req.body;

    // Assuming applications are stored in a separate model
    // This would need to be adjusted based on your actual schema
    return res.status(200).json({
      success: true,
      message: "Application status updated",
    });
  } catch (error) {
    console.error("Error in updateApplicationStatus controller:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get applications for a job
export const getJobApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const applications = await Connection.find({ jobId, type: "application" }).populate("fromUser");

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error in getJobApplications controller:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Save job (for job seekers)
export const saveJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if job is already saved
    const isJobSaved = user.savedJobs.includes(jobId);
    if (isJobSaved) {
      // Remove job from savedJobs
      user.savedJobs = user.savedJobs.filter(
        (savedJobId) => savedJobId.toString() !== jobId.toString()
      );
    } else {
      // Add job to savedJobs
      user.savedJobs.push(jobId);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: isJobSaved ? "Job removed from saved jobs" : "Job saved",
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    console.error("Error in saveJob controller:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server Error" });
  }
};

// Get saved jobs
export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("savedJobs");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    console.error("Error in getSavedJobs controller:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server Error" });
  }
};
