/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, AlertCircle } from "lucide-react";
import ProfileImage from "./ProfileImage";
import ContactGrid from "./ContactGrid";
import BioSection from "./BioSection";
import SkillsSection from "./SkillsSection";
import UserIdentificationSection from "./UserIdentificationSection";
import { validateField } from "./validators";
import { updateUserProfile } from "../../../../../services/api";

const ProfileSection = ({ 
  isOpen, 
  onClose, 
  userData,
  onProfileUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState(userData || {});
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(userData?.imageUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initialize with user data
  useEffect(() => {
    if (userData) {
      setLocalProfile(userData);
      setImagePreview(userData.imageUrl || "");
    }
  }, [userData]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setErrors({});
      setSaveSuccess(false);
    }
  }, [isOpen]);

  const handleChange = (field, value) => {
    const updatedProfile = { ...localProfile, [field]: value };
    setLocalProfile(updatedProfile);
    
    // Validate field
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: "Image must be less than 5MB" }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);
      handleChange("imageUrl", base64Image);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    // Validate all fields
    const newErrors = {};
    Object.keys(localProfile).forEach(key => {
      const err = validateField(key, localProfile[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Prepare update data (exclude name and email as they're not editable)
      const updateData = { ...localProfile };
      delete updateData.name;
      delete updateData.email;

      const response = await updateUserProfile(updateData);
      
      if (response.data.success) {
        setSaveSuccess(true);
        onProfileUpdate(response.data.user);
        
        // Reset editing mode after successful save
        setTimeout(() => {
          setIsEditing(false);
          setSaveSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setErrors({ 
        submit: error.response?.data?.message || "Failed to save profile" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="min-h-full flex items-center justify-center p-4"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Profile Settings
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Manage your personal and professional information
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {isEditing && (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            disabled={isLoading || Object.values(errors).some(e => e)}
                            className={`px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                              isLoading || Object.values(errors).some(e => e)
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                          >
                            {isLoading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                Save Changes
                              </>
                            )}
                          </button>
                        </div>
                      )}
                      
                      {!isEditing && (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                        >
                          Edit Profile
                        </button>
                      )}
                      
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2 text-green-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Profile updated successfully!
                      </div>
                    </motion.div>
                  )}

                  {errors.submit && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2 text-red-700">
                        <AlertCircle className="w-4 h-4" />
                        {errors.submit}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Image & Basic Info */}
                    <div className="lg:col-span-1">
                      <ProfileImage
                        isEditing={isEditing}
                        imagePreview={imagePreview}
                        error={errors.image}
                        onImageChange={handleImageChange}
                      />
                      
                      {/* Non-editable Basic Info */}
                      <div className="mt-8 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Full Name
                          </label>
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                            {userData?.name || "Not provided"}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Email Address
                          </label>
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                            {userData?.email || "Not provided"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Editable Fields */}
                    <div className="lg:col-span-2 space-y-8">
                      <ContactGrid
                        profile={userData}
                        localProfile={localProfile}
                        errors={errors}
                        isEditing={isEditing}
                        onChange={handleChange}
                      />

                      <UserIdentificationSection
                        profile={userData}
                        localProfile={localProfile}
                        errors={errors}
                        isEditing={isEditing}
                        onChange={handleChange}
                      />

                      <BioSection
                        isEditing={isEditing}
                        value={localProfile.bio}
                        error={errors.bio}
                        onChange={val => handleChange("bio", val)}
                      />

                      <SkillsSection
                        isEditing={isEditing}
                        value={localProfile.skills}
                        onChange={val => handleChange("skills", val)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileSection;