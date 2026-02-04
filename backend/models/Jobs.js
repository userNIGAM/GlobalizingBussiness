import mongoose from "mongoose"

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true }, // e.g., Full-time, Part-time
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    responsibilities: { type: [String], required: true },
    salaryRange: { type: String },
    postedDate: { type: Date, default: Date.now },
    applicationDeadline: { type: Date },
    tags: { type: [String] },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["active", "closed", "draft"], default: "active" },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    applications: [{ 
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
      appliedAt: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
)

const Job = mongoose.model("Job", jobSchema)

export default Job