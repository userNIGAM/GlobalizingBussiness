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
        fullName: user.name,
        email: user.email,
        phone: user.phoneNumber,
        location: user.location,
        jobTitle: user.jobTitle,
        bio: user.bio,
        profileImage: user.profilePicture,
        skills: user.skills || [],
        experience: user.experience || [],
        education: user.education || [],
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
    const {
      fullName,
      email,
      phone,
      location,
      jobTitle,
      bio,
      profileImage,
      skills,
      experience,
      education,
    } = req.body;

    // Prepare update object
    const updateData = {};
    if (fullName) updateData.name = fullName;
    if (email) updateData.email = email;
    if (phone) updateData.phoneNumber = phone;
    if (location) updateData.location = location;
    if (jobTitle) updateData.jobTitle = jobTitle;
    if (bio) updateData.bio = bio;
    if (profileImage) updateData.profilePicture = profileImage;
    if (skills) updateData.skills = skills;
    if (experience) updateData.experience = experience;
    if (education) updateData.education = education;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullName: user.name,
        email: user.email,
        phone: user.phoneNumber,
        location: user.location,
        jobTitle: user.jobTitle,
        bio: user.bio,
        profileImage: user.profilePicture,
        skills: user.skills || [],
        experience: user.experience || [],
        education: user.education || [],
      },
    });
  } catch (error) {
    console.error("Update user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
