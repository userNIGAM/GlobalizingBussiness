/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FileText, MapPin, Calendar, Hash, AlertCircle } from "lucide-react";
import { itemVariants } from "./animations";

const Field = ({ 
  label, 
  icon: Icon, 
  value, 
  editing, 
  error, 
  onChange, 
  type = "text", 
  placeholder,
  options
}) => (
  <motion.div variants={itemVariants}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-purple-500" />
        {label}
      </div>
    </label>

    {editing ? (
      <>
        {type === "select" ? (
          <select
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-200"
          >
            <option value="">Select ID Type</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-200"
          />
        )}
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </>
    ) : (
      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
        {type === "select" ? (
          options?.find(opt => opt.value === value)?.label || 
          <span className="text-gray-400">Not provided</span>
        ) : (
          value || <span className="text-gray-400">{placeholder}</span>
        )}
      </div>
    )}
  </motion.div>
);

const UserIdentificationSection = ({ 
  profile, 
  localProfile, 
  errors, 
  isEditing, 
  onChange 
}) => {
  const idTypeOptions = [
    { value: "passport", label: "Passport" },
    { value: "driver_license", label: "Driver's License" },
    { value: "national_id", label: "National ID" }
  ];

  return (
    <motion.div variants={itemVariants} className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Identification Details
        </h3>
        <div className="text-sm text-gray-500">
          KYC Verification
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          label="Address"
          icon={MapPin}
          value={isEditing ? localProfile.address : profile.address}
          editing={isEditing}
          error={errors.address}
          onChange={val => onChange("address", val)}
          placeholder="123 Main St, Apt 4B"
        />

        <Field
          label="Date of Birth"
          icon={Calendar}
          type="date"
          value={isEditing ? localProfile.dob : profile.dob}
          editing={isEditing}
          error={errors.dob}
          onChange={val => onChange("dob", val)}
        />

        <Field
          label="ID Type"
          icon={FileText}
          value={isEditing ? localProfile.idType : profile.idType}
          editing={isEditing}
          error={errors.idType}
          onChange={val => onChange("idType", val)}
          type="select"
          options={idTypeOptions}
        />

        <Field
          label="ID Number"
          icon={Hash}
          value={isEditing ? localProfile.idNumber : profile.idNumber}
          editing={isEditing}
          error={errors.idNumber}
          onChange={val => onChange("idNumber", val)}
          placeholder="A12345678"
        />
      </div>
    </motion.div>
  );
};

export default UserIdentificationSection;