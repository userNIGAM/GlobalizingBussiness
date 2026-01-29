/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { getCurrentUser } from "../../../../services/api.js";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileImage from "./profile/ProfileImage";
import ContactGrid from "./profile/ContactGrid";
import BioSection from "./profile/BioSection";
import SkillsSection from "./profile/SkillsSection";
import SaveBar from "./profile/SaveBar";
import LoadingSkeleton from "./profile/LoadingSkeleton";
import UserIdentificationSection from "./profile/UserIdentificationSection";
import { validateField } from "./profile/validators";
import { containerVariants, itemVariants, loadingVariants } from "./profile/animations";

const ProfileSection = ({ profile, setProfile, isLoading = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [localProfile, setLocalProfile] = useState(profile);
  const [imagePreview, setImagePreview] = useState(profile?.imageUrl || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchUser();
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
        <ProfileHeader 
          isEditing={isEditing} 
          onToggle={() => isEditing ? handleCancel() : setIsEditing(true)}
        />

        <div className="p-8">
          {/* Profile Image Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10"
          >
            <ProfileImage
              isEditing={isEditing}
              imagePreview={imagePreview}
              error={errors.image}
              onImageChange={handleImageChange}
            />

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        value={localProfile.name || ""}
                        onChange={(e) =>
                          handleChange("name", e.target.value)
                        }
                        className="w-full text-2xl font-bold bg-transparent border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-500 text-sm mt-2"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
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
            </div>
          </motion.div>

          {/* Contact Information Grid */}
          <ContactGrid
            profile={profile}
            localProfile={localProfile}
            isEditing={isEditing}
            errors={errors}
            onChange={handleChange}
          />

          {/* Bio Section */}
          <BioSection
            isEditing={isEditing}
            value={localProfile.bio}
            error={errors.bio}
            onChange={(val) => handleChange("bio", val)}
          />

          {/* Skills Section */}
          <SkillsSection
            isEditing={isEditing}
            value={localProfile.skills}
            onChange={(val) => handleChange("skills", val)}
          />

          {/* User Identification Section */}
          <UserIdentificationSection
            profile={profile}
            localProfile={localProfile}
            errors={errors}
            isEditing={isEditing}
            onChange={handleChange}
          />

          {/* Save Bar */}
          <SaveBar
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={handleCancel}
            hasErrors={Object.keys(errors).some((key) => errors[key] !== "")}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSection;