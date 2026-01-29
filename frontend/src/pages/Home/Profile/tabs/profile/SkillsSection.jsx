/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Zap, Plus, X } from "lucide-react";
import { itemVariants } from "./animations";

const SkillsSection = ({ isEditing, value = [], onChange }) => {
  const skills = Array.isArray(value) ? value : (typeof value === "string" ? value.split(",").map(s => s.trim()).filter(s => s) : []);

  const handleAddSkill = () => {
    onChange([...skills, ""]);
  };

  const handleRemoveSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const handleSkillChange = (index, val) => {
    const updated = [...skills];
    updated[index] = val;
    onChange(updated);
  };

  return (
    <motion.div variants={itemVariants} className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-teal-500" />
            Key Skills
          </div>
        </label>
        {isEditing && (
          <button
            onClick={handleAddSkill}
            className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Enter a skill"
                value={skill}
                onChange={(e) => handleSkillChange(idx, e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
              />
              <button
                onClick={() => handleRemoveSkill(idx)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
          {skills.length === 0 && (
            <p className="text-sm text-gray-500 italic">No skills added yet</p>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((skill, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium border border-teal-200"
              >
                {skill}
              </motion.span>
            ))
          ) : (
            <div className="p-4 text-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 w-full">
              <p className="text-gray-500 text-sm">No skills added yet</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SkillsSection;
