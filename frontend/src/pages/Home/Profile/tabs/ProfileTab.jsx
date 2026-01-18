/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit2,
  Check,
  X,
  Upload,
  AlertCircle,
} from "lucide-react";

const ProfileSection = ({ profile, setProfile, isLoading = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [localProfile, setLocalProfile] = useState(profile);
  const [imagePreview, setImagePreview] = useState(profile?.imageUrl || "");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  // Loading animation
  const loadingVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Validation rules
  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        else if (value.length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "phone":
        if (value && !/^[\d\s\-\+\(\)]{10,}$/.test(value))
          error = "Invalid phone number";
        break;
      case "bio":
        if (value && value.length > 500)
          error = "Bio must be less than 500 characters";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (field, value) => {
    setLocalProfile((prev) => ({ ...prev, [field]: value }));

    // Validate on change
    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image must be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setLocalProfile((prev) => ({
          ...prev,
          imageUrl: reader.result,
        }));
        setErrors((prev) => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Validate all fields
    const newErrors = {};
    Object.keys(localProfile).forEach((key) => {
      const error = validateField(key, localProfile[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      setProfile(localProfile);
      setIsEditing(false);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    setLocalProfile(profile);
    setImagePreview(profile?.imageUrl || "");
    setIsEditing(false);
    setErrors({});
  };

  // Reset local profile when prop changes
  useEffect(() => {
    setLocalProfile(profile);
    setImagePreview(profile?.imageUrl || "");
  }, [profile]);

  if (isLoading) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto p-6"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
          {/* Loading skeleton */}
          <motion.div
            variants={loadingVariants}
            animate="animate"
            className="space-y-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-2xl bg-linear-to-r from-gray-200 to-gray-300 animate-pulse" />
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse w-3/4" />
                <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse w-1/2" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-linear-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto p-6"
    >
      <motion.div
        variants={itemVariants}
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-linear-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900"
            >
              Personal Profile
            </motion.h1>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() =>
                  isEditing ? handleCancel() : setIsEditing(true)
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isEditing
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-linear-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
                }`}
              >
                {isEditing ? (
                  <>
                    <X className="w-5 h-5" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="w-5 h-5" />
                    Edit Profile
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>

        <div className="p-8">
          {/* Profile Image Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10"
          >
            <div className="relative group">
              <motion.div
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative"
              >
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={
                      imagePreview ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {isEditing && (
                  <motion.label
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-3 right-3 bg-linear-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  >
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </motion.label>
                )}
              </motion.div>
            </div>

            {errors.image && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 text-sm mt-2"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.image}
              </motion.div>
            )}

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        value={localProfile.fullName || ""}
                        onChange={(e) =>
                          handleChange("fullName", e.target.value)
                        }
                        className="w-full text-2xl font-bold bg-transparent border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2"
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-500 text-sm mt-2"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.fullName}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    profile.fullName || "John Doe"
                  )}
                </h2>
                <p className="text-gray-600">
                  {profile.title || "Software Developer"}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>{profile.location || "San Francisco, CA"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5 text-green-500" />
                  <span>{profile.phone || "(555) 123-4567"}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  Email Address
                </div>
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="email"
                    value={localProfile.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm mt-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-900">
                    {profile.email || "john.doe@example.com"}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Phone Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-500" />
                  Phone Number
                </div>
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="tel"
                    value={localProfile.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm mt-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-900">
                    {profile.phone || "(555) 123-4567"}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Location Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  Location
                </div>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={localProfile.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="City, Country"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-900">
                    {profile.location || "San Francisco, CA"}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Experience Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-500" />
                  Years of Experience
                </div>
              </label>
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={localProfile.experience || ""}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                  placeholder="5"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-900">
                    {profile.experience ? `${profile.experience} years` : "5 years"}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Bio Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-500" />
                Bio / Professional Summary
              </div>
            </label>
            {isEditing ? (
              <div>
                <textarea
                  rows={4}
                  value={localProfile.bio || ""}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none transition-all"
                  placeholder="Tell us about yourself..."
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.bio && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.bio}
                    </motion.div>
                  )}
                  <div className="text-sm text-gray-500 ml-auto">
                    {(localProfile.bio?.length || 0)}/500 characters
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-xl">
                <p className="text-gray-700 whitespace-pre-line">
                  {profile.bio ||
                    "Passionate software developer with experience in building scalable web applications. Love to learn new technologies and contribute to open-source projects."}
                </p>
              </div>
            )}
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-teal-500" />
                Key Skills
              </div>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={localProfile.skills || ""}
                onChange={(e) => handleChange("skills", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                placeholder="JavaScript, React, Node.js, TypeScript"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills?.split(",").map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1.5 bg-linear-to-r from-teal-50 to-emerald-50 text-teal-700 rounded-lg text-sm font-medium border border-teal-200"
                  >
                    {skill.trim()}
                  </motion.span>
                )) || (
                  <>
                    <span className="px-3 py-1.5 bg-linear-to-r from-teal-50 to-emerald-50 text-teal-700 rounded-lg text-sm font-medium border border-teal-200">
                      JavaScript
                    </span>
                    <span className="px-3 py-1.5 bg-linear-to-r from-teal-50 to-emerald-50 text-teal-700 rounded-lg text-sm font-medium border border-teal-200">
                      React
                    </span>
                    <span className="px-3 py-1.5 bg-linear-to-r from-teal-50 to-emerald-50 text-teal-700 rounded-lg text-sm font-medium border border-teal-200">
                      Node.js
                    </span>
                    <span className="px-3 py-1.5 bg-linear-to-r from-teal-50 to-emerald-50 text-teal-700 rounded-lg text-sm font-medium border border-teal-200">
                      TypeScript
                    </span>
                  </>
                )}
              </div>
            )}
          </motion.div>

          {/* Save Button (only in edit mode) */}
          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-4 justify-end pt-6 border-t border-gray-200"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-6 py-3 rounded-xl font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={Object.keys(errors).some(
                    (key) => errors[key] !== ""
                  )}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    Object.keys(errors).some((key) => errors[key] !== "")
                      ? "bg-gray-300 cursor-not-allowed text-gray-500"
                      : "bg-linear-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Save Changes
                  </div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSection;