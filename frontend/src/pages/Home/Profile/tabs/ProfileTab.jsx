/* eslint-disable no-unused-vars */
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  Award,
  FileText,
} from "lucide-react";

const fields = [
  { label: "Full Name", field: "fullName", icon: User },
  { label: "Email", field: "email", icon: Mail, type: "email" },
  { label: "Phone", field: "phone", icon: Phone },
  { label: "Location", field: "location", icon: MapPin },
  { label: "Current Job Title", field: "title", icon: Briefcase },
  { label: "Years of Experience", field: "experience", icon: Clock },
  { label: "Key Skills", field: "skills", icon: Award },
];

export default function ProfileTab({ profile, setProfile }) {
  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {fields.map(({ label, field, icon: Icon, type = "text" }) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-2">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-gray-400" />
              {label}
            </div>
          </label>
          <input
            type={type}
            value={profile[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-xl"
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        </div>
      ))}

      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            Professional Summary
          </div>
        </label>
        <textarea
          rows={4}
          value={profile.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          className="w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-xl resize-none"
        />
      </div>
    </div>
  );
}
