/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Briefcase, Plus, X, AlertCircle } from "lucide-react";
import { itemVariants } from "./animations";

const ExperienceSection = ({ isEditing, value = [], onChange }) => {
  const experiences = Array.isArray(value) ? value : [];

  const handleAddExperience = () => {
    const newExperience = {
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      currentlyWorking: false
    };
    onChange([...experiences, newExperience]);
  };

  const handleRemoveExperience = (index) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index, field, val) => {
    const updated = [...experiences];
    updated[index][field] = val;
    onChange(updated);
  };

  return (
    <motion.div variants={itemVariants} className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            Work Experience
          </div>
        </label>
        {isEditing && (
          <button
            onClick={handleAddExperience}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        )}
      </div>

      {experiences.length > 0 ? (
        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl"
            >
              <div className="flex justify-between items-start gap-4">
                {isEditing ? (
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.position || ""}
                        onChange={(e) =>
                          handleExperienceChange(idx, "position", e.target.value)
                        }
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company || ""}
                        onChange={(e) =>
                          handleExperienceChange(idx, "company", e.target.value)
                        }
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Start Date (MM/YYYY)"
                        value={exp.startDate || ""}
                        onChange={(e) =>
                          handleExperienceChange(idx, "startDate", e.target.value)
                        }
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        placeholder="End Date (MM/YYYY)"
                        value={exp.endDate || ""}
                        onChange={(e) =>
                          handleExperienceChange(idx, "endDate", e.target.value)
                        }
                        disabled={exp.currentlyWorking}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm disabled:bg-gray-100"
                      />
                    </div>
                    <textarea
                      placeholder="Description"
                      value={exp.description || ""}
                      onChange={(e) =>
                        handleExperienceChange(idx, "description", e.target.value)
                      }
                      rows="2"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm resize-none"
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.currentlyWorking || false}
                        onChange={(e) =>
                          handleExperienceChange(idx, "currentlyWorking", e.target.checked)
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-600">Currently working here</span>
                    </label>
                  </div>
                ) : (
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                    )}
                  </div>
                )}
                {isEditing && (
                  <button
                    onClick={() => handleRemoveExperience(idx)}
                    className="text-red-500 hover:text-red-700 transition-colors mt-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
          <Briefcase className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">No work experience added yet</p>
          {isEditing && (
            <p className="text-xs text-gray-400 mt-2">Click "Add" to get started</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ExperienceSection;
