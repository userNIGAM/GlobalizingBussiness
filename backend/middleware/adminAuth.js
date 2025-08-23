import { protect } from "./auth.js";
import User from "../models/User.js";

export const adminAuth = async (req, res, next) => {
  try {
    // First use the protect middleware to authenticate the user
    protect(req, res, () => {
      // After authentication, check if user is admin
      if (req.user && req.user.role === "admin") {
        next();
      } else {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admin privileges required.",
        });
      }
    });
  } catch (error) {
    console.error("Admin auth middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error in admin authentication",
    });
  }
};
