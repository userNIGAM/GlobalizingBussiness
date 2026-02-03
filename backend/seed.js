import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing seed users
    await User.deleteMany({
      email: { $in: ["jobseeker@gmail.com", "jobprovider@gmail.com"] }
    });
    console.log("✅ Cleared existing seed users");

    // Create Job Seeker (password will be hashed by User model pre-save hook)
    const jobSeeker = await User.create({
      name: "Nigam Subedi",
      email: "jobseeker@gmail.com",
      password: "Jobseeker123",
      userType: "jobSeeker",
      isVerified: true,
      isActive: true,
      role: "user",
      kycStatus: "not_submitted",
    });
    console.log("✅ Created Job Seeker:", jobSeeker.email);

    // Create Job Provider (password will be hashed by User model pre-save hook)
    const jobProvider = await User.create({
      name: "Job Provider",
      email: "jobprovider@gmail.com",
      password: "Jobprovider123",
      userType: "jobProvider",
      isVerified: true,
      isActive: true,
      role: "user",
      kycStatus: "not_submitted",
    });
    console.log("✅ Created Job Provider:", jobProvider.email);

    console.log("\n=== Seed Data Created Successfully ===");
    console.log("📧 Job Seeker Login:");
    console.log("   Email: jobseeker@gmail.com");
    console.log("   Password: Jobseeker123");
    console.log("\n📧 Job Provider Login:");
    console.log("   Email: jobprovider@gmail.com");
    console.log("   Password: Jobprovider123");
    console.log("\n✅ Both users are email-verified and ready to use!");

    await mongoose.connection.close();
    console.log("\n✅ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
