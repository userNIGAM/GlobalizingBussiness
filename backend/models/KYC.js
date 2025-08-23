import mongoose from "mongoose";

const KYCSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    idType: {
      type: String,
      required: true,
      enum: ["passport", "driver_license", "national_id"],
    },
    idNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    profilePicture: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },
    idDocument: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },
    addressProof: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },
    resume: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },
    reviewNotes: String,
    reviewedAt: Date,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Index for user and status
KYCSchema.index({ user: 1 });
KYCSchema.index({ status: 1 });

const KYC = mongoose.model("KYC", KYCSchema);

export default KYC;
