import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const verifyUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    const jobSeeker = await User.findOne({ email: "jobseeker@gmail.com" });
    const jobProvider = await User.findOne({ email: "jobprovider@gmail.com" });

    console.log("=== DATABASE VERIFICATION ===\n");

    if (jobSeeker) {
      console.log("✅ JOB SEEKER FOUND:");
      console.log("   Name:", jobSeeker.name);
      console.log("   Email:", jobSeeker.email);
      console.log("   UserType:", jobSeeker.userType);
      console.log("   Verified:", jobSeeker.isVerified);
      console.log("   Active:", jobSeeker.isActive);
    } else {
      console.log("❌ Job Seeker not found");
    }

    console.log();

    if (jobProvider) {
      console.log("✅ JOB PROVIDER FOUND:");
      console.log("   Email:", jobProvider.email);
      console.log("   UserType:", jobProvider.userType);
      console.log("   Verified:", jobProvider.isVerified);
      console.log("   Active:", jobProvider.isActive);
    } else {
      console.log("❌ Job Provider not found");
    }

    console.log("\n✅ Verification complete!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

verifyUsers();
