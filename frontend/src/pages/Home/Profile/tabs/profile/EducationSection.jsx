/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { BookOpen, Plus, X, AlertCircle } from "lucide-react";
import { itemVariants } from "./animations";

const EducationSection = ({ isEditing, value = [], onChange }) => {
  const education = Array.isArray(value) ? value : [];

  const handleAddEducation = () => {
    const newEducation = {
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    onChange([...education, newEducation]);
  };

  const handleRemoveEducation = (index) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index, field, val) => {
    const updated = [...education];
    updated[index][field] = val;
    onChange(updated);
  };

  return (
    <motion.div variants={itemVariants} className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            Education
          </div>
        </label>
        {isEditing && (
          <button
            onClick={handleAddEducation}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        )}
      </div>

      {education.length > 0 ? (
        <div className="space-y-4">
          {education.map((edu, idx) => (
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
                        placeholder="School/University"
                        value={edu.school || ""}
                        onChange={(e) =>
                          handleEducationChange(idx, "school", e.target.value)
                        }
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree || ""}
                        onChange={(e) =>
                          handleEducationChange(idx, "degree", e.target.value)
                        }
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.field || ""}
                        onChange={(e) =>
                          handleEducationChange(idx, "field", e.target.value)
                        }
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Start (MM/YYYY)"
                          value={edu.startDate || ""}
                          onChange={(e) =>
                            handleEducationChange(idx, "startDate", e.target.value)
                          }
                          className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                        />
                        <input
                          type="text"
                          placeholder="End (MM/YYYY)"
                          value={edu.endDate || ""}
                          onChange={(e) =>
                            handleEducationChange(idx, "endDate", e.target.value)
                          }
                          className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                    <textarea
                      placeholder="Description"
                      value={edu.description || ""}
                      onChange={(e) =>
                        handleEducationChange(idx, "description", e.target.value)
                      }
                      rows="2"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm resize-none"
                    />
                  </div>
                ) : (
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                    {edu.field && (
                      <p className="text-sm text-gray-600">Field: {edu.field}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-gray-700 mt-2">{edu.description}</p>
                    )}
                  </div>
                )}
                {isEditing && (
                  <button
                    onClick={() => handleRemoveEducation(idx)}
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
          <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">No education added yet</p>
          {isEditing && (
            <p className="text-xs text-gray-400 mt-2">Click "Add" to get started</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default EducationSection;
