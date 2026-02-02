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
  },
  { timestamps: true }
)

const Job = mongoose.model("Job", jobSchema)

export default Job