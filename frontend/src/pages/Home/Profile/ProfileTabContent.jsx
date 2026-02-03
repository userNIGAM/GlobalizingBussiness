/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, X, Edit2, Upload, Loader } from "lucide-react";
import { getUserFullProfile, saveUserProfile } from "../../../services/api.js";
import ExperienceSection from "./tabs/profile/ExperienceSection.jsx";
import EducationSection from "./tabs/profile/EducationSection.jsx";
import SkillsSection from "./tabs/profile/SkillsSection.jsx";
import Logout from "./tabs/profile/Logout.jsx";

export default function ProfileTabContent({ activeTab, profile, setProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUserFullProfile();
        if (response.data.success) {
          const userData = response.data.user;
          setProfile(userData);
          setEditedProfile(userData);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const response = await saveUserProfile(editedProfile);
      if (response.data.success) {
        setProfile(editedProfile);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  // Overview Tab
  if (activeTab === "overview") {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
          >
            {error}
          </motion.div>
        )}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
          >
            {successMessage}
          </motion.div>
        )}
        {/* Profile Header Section */}
        <div className="flex gap-8 pb-8 border-b border-gray-200">
          <div className="shrink-0">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                {editedProfile.profileImage ? (
                  <img
                    src={editedProfile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  editedProfile.fullName?.charAt(0) || "U"
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  value={editedProfile.fullName}
                  onChange={handleProfileChange}
                  placeholder="Full Name"
                  className="w-full text-2xl font-bold px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="jobTitle"
                  value={editedProfile.jobTitle}
                  onChange={handleProfileChange}
                  placeholder="Job Title"
                  className="w-full text-lg px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-600"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editedProfile.fullName || "Your Name"}
                </h2>
                <p className="text-lg text-gray-600 mt-1">
                  {editedProfile.jobTitle || "Job Title"}
                </p>
              </div>
            )}

            <div className="mt-4 flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
                  >
                    {saving && <Loader className="w-4 h-4 animate-spin" />}
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setEditedProfile(profile);
                      setIsEditing(false);
                    }}
                    disabled={saving}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedProfile.email}
                onChange={handleProfileChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-600 px-4 py-2 bg-gray-50 rounded-lg">
                {editedProfile.email || "Not added"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editedProfile.phone}
                onChange={handleProfileChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-600 px-4 py-2 bg-gray-50 rounded-lg">
                {editedProfile.phone || "Not added"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={editedProfile.location}
                onChange={handleProfileChange}
                placeholder="City, Country"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-600 px-4 py-2 bg-gray-50 rounded-lg">
                {editedProfile.location || "Not added"}
              </p>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Professional Summary
          </label>
          {isEditing ? (
            <textarea
              name="bio"
              value={editedProfile.bio}
              onChange={handleProfileChange}
              placeholder="Write a brief summary about yourself..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p className="text-gray-600 px-4 py-2 bg-gray-50 rounded-lg min-h-24">
              {editedProfile.bio || "No summary added yet"}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Experience Tab
  if (activeTab === "experience") {
    return (
      <div className="space-y-6">
        <ExperienceSection
          isEditing={isEditing}
          value={editedProfile.experience || []}
          onChange={(val) => setEditedProfile(prev => ({ ...prev, experience: val }))}
        />
        
        {isEditing && (
          <div className="flex gap-3">
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
            >
              {saving && <Loader className="w-4 h-4 animate-spin" />}
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setEditedProfile(profile);
                setIsEditing(false);
              }}
              disabled={saving}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }

  // Skills Tab
  if (activeTab === "skills") {
    return (
      <div className="space-y-6">
        <SkillsSection
          isEditing={isEditing}
          value={editedProfile.skills || []}
          onChange={(val) => setEditedProfile(prev => ({ ...prev, skills: val }))}
        />
        
        {isEditing && (
          <div className="flex gap-3">
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
            >
              {saving && <Loader className="w-4 h-4 animate-spin" />}
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setEditedProfile(profile);
                setIsEditing(false);
              }}
              disabled={saving}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }

  // Education Tab
  if (activeTab === "education") {
    return (
      <div className="space-y-6">
        <EducationSection
          isEditing={isEditing}
          value={editedProfile.education || []}
          onChange={(val) => setEditedProfile(prev => ({ ...prev, education: val }))}
        />
        
        {isEditing && (
          <div className="flex gap-3">
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
            >
              {saving && <Loader className="w-4 h-4 animate-spin" />}
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setEditedProfile(profile);
                setIsEditing(false);
              }}
              disabled={saving}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }
    if(activeTab === "Logout") {
    return <Logout />;
     }
}
