import KYC from "../models/KYC.js";
import User from "../models/User.js";
import { existsSync, mkdirSync, createReadStream } from "fs";
import { extname } from "path";

// Configure multer for file uploads
import multer, { diskStorage } from "multer";
const storage = diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/kyc";
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Check file types
  if (file.fieldname === "profilePicture") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for profile picture"), false);
    }
  } else if (
    file.fieldname === "idDocument" ||
    file.fieldname === "addressProof"
  ) {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Only image and PDF files are allowed for documents"),
        false
      );
    }
  } else if (file.fieldname === "resume") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Only PDF, DOC, and DOCX files are allowed for resume"),
        false
      );
    }
  } else {
    cb(new Error("Unexpected field"), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// Submit KYC application
export async function submitKYC(req, res) {
  try {
    const userId = req.user.id;

    // Check if user already has a KYC submission
    const existingKYC = await KYC.findOne({ user: userId });
    if (existingKYC) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a KYC application",
      });
    }

    // Create KYC record
    const kycData = {
      user: userId,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      dob: req.body.dob,
      idType: req.body.idType,
      idNumber: req.body.idNumber,
      status: "pending",
    };

    // Add file information if files were uploaded
    if (req.files) {
      if (req.files.profilePicture) {
        kycData.profilePicture = {
          filename: req.files.profilePicture[0].filename,
          originalName: req.files.profilePicture[0].originalname,
          path: req.files.profilePicture[0].path,
          mimetype: req.files.profilePicture[0].mimetype,
          size: req.files.profilePicture[0].size,
        };
      }

      if (req.files.idDocument) {
        kycData.idDocument = {
          filename: req.files.idDocument[0].filename,
          originalName: req.files.idDocument[0].originalname,
          path: req.files.idDocument[0].path,
          mimetype: req.files.idDocument[0].mimetype,
          size: req.files.idDocument[0].size,
        };
      }

      if (req.files.addressProof) {
        kycData.addressProof = {
          filename: req.files.addressProof[0].filename,
          originalName: req.files.addressProof[0].originalname,
          path: req.files.addressProof[0].path,
          mimetype: req.files.addressProof[0].mimetype,
          size: req.files.addressProof[0].size,
        };
      }

      if (req.files.resume) {
        kycData.resume = {
          filename: req.files.resume[0].filename,
          originalName: req.files.resume[0].originalname,
          path: req.files.resume[0].path,
          mimetype: req.files.resume[0].mimetype,
          size: req.files.resume[0].size,
        };
      }
    }

    const kyc = new KYC(kycData);
    await kyc.save();

    // Update user's KYC status
    await User.findByIdAndUpdate(userId, { kycStatus: "pending" });

    res.status(201).json({
      success: true,
      message: "KYC application submitted successfully",
      data: kyc,
    });
  } catch (error) {
    console.error("KYC submission error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Get user's KYC status
export async function getKYCStatus(req, res) {
  try {
    const userId = req.user.id;

    const kyc = await KYC.findOne({ user: userId })
      .select("-__v")
      .populate("user", "name email");

    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "No KYC application found",
      });
    }

    res.json({
      success: true,
      data: kyc,
    });
  } catch (error) {
    console.error("Get KYC status error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Get all KYC applications (admin only)
export async function getAllKYC(req, res) {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let query = {};
    if (status) {
      query.status = status;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: "user",
      select: "-__v",
    };

    const kycs = await paginate(query, options);

    res.json({
      success: true,
      data: kycs,
    });
  } catch (error) {
    console.error("Get all KYC error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Update KYC status (admin only)
export async function updateKYCStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, reviewNotes } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const kyc = await KYC.findById(id).populate("user");

    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "KYC application not found",
      });
    }

    kyc.status = status;
    kyc.reviewedAt = new Date();
    if (reviewNotes) {
      kyc.reviewNotes = reviewNotes;
    }

    await kyc.save();

    // Update user's KYC status
    await User.findByIdAndUpdate(kyc.user._id, { kycStatus: status });

    res.json({
      success: true,
      message: `KYC application ${status} successfully`,
      data: kyc,
    });
  } catch (error) {
    console.error("Update KYC status error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Get KYC document (admin only)
export async function getKYCDocument(req, res) {
  try {
    const { id, documentType } = req.params;

    if (
      !["profilePicture", "idDocument", "addressProof", "resume"].includes(
        documentType
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid document type",
      });
    }

    const kyc = await KYC.findById(id);

    if (!kyc || !kyc[documentType]) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const filePath = kyc[documentType].path;

    if (!existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    res.setHeader("Content-Type", kyc[documentType].mimetype);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${kyc[documentType].originalName}"`
    );

    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Get KYC document error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
// Update user's own KYC information (non-admin)
export async function updateKYC(req, res) {
  try {
    const userId = req.user.id;
    const { phone, address, dob, idType, idNumber } = req.body;

    // Find user's KYC record
    const kyc = await KYC.findOne({ user: userId });

    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "No KYC record found. Please submit KYC first.",
      });
    }

    // Only allow updates if status is pending or rejected
    if (kyc.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "Cannot update approved KYC records",
      });
    }

    // Update allowed fields
    if (phone) kyc.phone = phone;
    if (address) kyc.address = address;
    if (dob) kyc.dob = new Date(dob);
    if (idType) kyc.idType = idType;
    if (idNumber) kyc.idNumber = idNumber;

    await kyc.save();

    res.json({
      success: true,
      message: "KYC information updated successfully",
      data: kyc,
    });
  } catch (error) {
    console.error("Update KYC error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}