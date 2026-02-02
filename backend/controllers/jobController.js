import User from "../models/User";


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
}
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
