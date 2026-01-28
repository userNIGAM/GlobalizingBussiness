/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCurrentUser, getKYCStatus, updateKYCStatus } from "../../../../services/api";

import ProfileHeader from "./ProfileHeader";
import ProfileImage from "./ProfileImage";
import ContactGrid from "./ContactGrid";
import BioSection from "./BioSection";
import SkillsSection from "./SkillsSection";
import UserIdentificationSection from "./UserIdentificationSection";
import SaveBar from "./SaveBar";
import LoadingSkeleton from "./LoadingSkeleton";

import { containerVariants } from "./animations";
import { validateField } from "./validators";

const ProfileSection = ({ profile, setProfile, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(profile?.imageUrl || "");
  const [userIdentification, setUserIdentification] = useState(null);
  const [kycLoading, setKycLoading] = useState(true);

  useEffect(() => {
    setLocalProfile(profile);
    setImagePreview(profile?.imageUrl || "");
    // Fetch KYC data
    fetchKYCData();
  }, [profile]);

  const fetchKYCData = async () => {
    try {
      const response = await getKYCStatus();
      setUserIdentification(response.data.data);
    } catch (error) {
      console.log("No KYC data found", error);
      setUserIdentification(null);
    } finally {
      setKycLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setLocalProfile(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, value)
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
      setImagePreview(reader.result);
      setLocalProfile(prev => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const newErrors = {};
    Object.keys(localProfile).forEach(key => {
      const err = validateField(key, localProfile[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length === 0) {
      try {
        // Save profile data
        setProfile(localProfile);

        // If we have user identification fields that changed, update them
        if (userIdentification && (
          localProfile.phone || 
          localProfile.address || 
          localProfile.dob || 
          localProfile.idType || 
          localProfile.idNumber
        )) {
          const kycUpdateData = {};
          if (localProfile.phone) kycUpdateData.phone = localProfile.phone;
          if (localProfile.address) kycUpdateData.address = localProfile.address;
          if (localProfile.dob) kycUpdateData.dob = localProfile.dob;
          if (localProfile.idType) kycUpdateData.idType = localProfile.idType;
          if (localProfile.idNumber) kycUpdateData.idNumber = localProfile.idNumber;

          await updateKYCStatus(kycUpdateData);
        }

        setIsEditing(false);
        setErrors({});
      } catch (error) {
        console.error("Error saving profile:", error);
        setErrors({ submit: "Failed to save profile" });
      }
    } else {
      setErrors(newErrors);
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white/80 rounded-3xl shadow-xl border overflow-hidden">
        <ProfileHeader
          isEditing={isEditing}
          onToggle={() => setIsEditing(prev => !prev)}
        />

        <div className="p-8 space-y-8">
          <ProfileImage
            isEditing={isEditing}
            imagePreview={imagePreview}
            error={errors.image}
            onImageChange={handleImageChange}
          />

          <ContactGrid
            profile={profile}
            localProfile={localProfile}
            errors={errors}
            isEditing={isEditing}
            onChange={handleChange}
          />

          {!kycLoading && userIdentification && (
            <UserIdentificationSection
              profile={profile}
              localProfile={localProfile}
              errors={errors}
              isEditing={isEditing}
              onChange={handleChange}
              userIdentification={userIdentification}
            />
          )}

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

          <SaveBar
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            hasErrors={Object.values(errors).some(e => e)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
