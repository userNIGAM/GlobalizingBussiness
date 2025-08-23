import User from "../models/User.js";
import KYC from "../models/KYC.js"; // Changed from KycUser to KYC

// Get user profile with KYC status
export async function getUserProfile(req, res) {
  try {
    const userId = req.user.id;

    // Get user details
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get KYC details if exists
    let kycDetails = null;
    if (user.kycStatus !== "not_submitted") {
      kycDetails = await KYC.findOne({ user: userId }).select(
        "status submittedAt reviewedAt"
      );
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        kycStatus: user.kycStatus,
        kycDetails: kycDetails,
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Update user profile
export async function updateUserProfile(req, res) {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
