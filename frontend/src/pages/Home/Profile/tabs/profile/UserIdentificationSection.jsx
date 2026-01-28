/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, IdCard } from "lucide-react";
import { containerVariants, itemVariants } from "./animations";

const Field = ({ label, value, editing, error, onChange, type = "text", placeholder, disabled = false }) => (
  <motion.div variants={itemVariants}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>

    {editing && !disabled ? (
      <>
        <input
          type={type}
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed"
        />
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </>
    ) : (
      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
        {value || placeholder}
      </div>
    )}
  </motion.div>
);

const UserIdentificationSection = ({ 
  profile, 
  localProfile, 
  errors, 
  isEditing, 
  onChange,
  userIdentification 
}) => {
  const displayProfile = isEditing ? localProfile : (userIdentification || profile);

  return (
    <motion.div
      variants={containerVariants}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <IdCard className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">User Identification</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
        {/* Full Name - Read Only */}
        <Field
          label="Full Name"
          value={displayProfile?.fullName || ""}
          editing={false}
          disabled={true}
          placeholder="Full Name"
        />

        {/* Email - Read Only */}
        <Field
          label="Email Address"
          type="email"
          value={displayProfile?.email || ""}
          editing={false}
          disabled={true}
          placeholder="email@example.com"
        />

        {/* Phone - Editable */}
        <Field
          label="Phone Number"
          value={displayProfile?.phone || ""}
          editing={isEditing}
          error={errors?.phone}
          onChange={val => onChange("phone", val)}
          placeholder="(555) 123-4567"
          disabled={false}
        />

        {/* Address - Editable */}
        <Field
          label="Address"
          value={displayProfile?.address || ""}
          editing={isEditing}
          error={errors?.address}
          onChange={val => onChange("address", val)}
          placeholder="123 Main Street, City, Country"
          disabled={false}
        />

        {/* Date of Birth - Editable */}
        <Field
          label="Date of Birth"
          type="date"
          value={displayProfile?.dob ? new Date(displayProfile.dob).toISOString().split('T')[0] : ""}
          editing={isEditing}
          error={errors?.dob}
          onChange={val => onChange("dob", val)}
          disabled={false}
        />

        {/* ID Type - Editable */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Type
          </label>

          {isEditing ? (
            <>
              <select
                value={displayProfile?.idType || ""}
                onChange={e => onChange("idType", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2"
              >
                <option value="">Select ID Type</option>
                <option value="passport">Passport</option>
                <option value="driver_license">Driver's License</option>
                <option value="national_id">National ID</option>
              </select>
              {errors?.idType && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.idType}
                </div>
              )}
            </>
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
              {displayProfile?.idType ? (displayProfile.idType.replace('_', ' ').toUpperCase()) : "N/A"}
            </div>
          )}
        </motion.div>

        {/* ID Number - Editable */}
        <Field
          label="ID Number"
          value={displayProfile?.idNumber || ""}
          editing={isEditing}
          error={errors?.idNumber}
          onChange={val => onChange("idNumber", val)}
          placeholder="ABC123456789"
          disabled={false}
        />
      </div>
    </motion.div>
  );
};

export default UserIdentificationSection;
