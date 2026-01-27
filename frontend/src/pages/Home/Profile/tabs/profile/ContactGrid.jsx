/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User, AlertCircle } from "lucide-react";
import { containerVariants, itemVariants } from "./animations";

const Field = ({ label, icon: Icon, value, editing, error, onChange, type = "text", placeholder }) => (
  <motion.div variants={itemVariants}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-500" />
        {label}
      </div>
    </label>

    {editing ? (
      <>
        <input
          type={type}
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2"
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

const ContactGrid = ({ profile, localProfile, errors, isEditing, onChange }) => {
  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
    >
      <Field
        label="Email Address"
        icon={Mail}
        type="email"
        value={isEditing ? localProfile.email : profile.email}
        editing={isEditing}
        error={errors.email}
        onChange={val => onChange("email", val)}
        placeholder="you@example.com"
      />

      <Field
        label="Phone Number"
        icon={Phone}
        value={isEditing ? localProfile.phone : profile.phone}
        editing={isEditing}
        error={errors.phone}
        onChange={val => onChange("phone", val)}
        placeholder="(555) 123-4567"
      />

      <Field
        label="Location"
        icon={MapPin}
        value={isEditing ? localProfile.location : profile.location}
        editing={isEditing}
        onChange={val => onChange("location", val)}
        placeholder="San Francisco, CA"
      />

      <Field
        label="Years of Experience"
        icon={User}
        type="number"
        value={isEditing ? localProfile.experience : profile.experience}
        editing={isEditing}
        onChange={val => onChange("experience", val)}
        placeholder="5"
      />
    </motion.div>
  );
};

export default ContactGrid;
