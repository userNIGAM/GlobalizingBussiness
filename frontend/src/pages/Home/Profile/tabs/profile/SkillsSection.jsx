/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { itemVariants } from "./animations";

const SkillsSection = ({ isEditing, value, onChange }) => {
  return (
    <motion.div variants={itemVariants} className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-teal-500" />
          Key Skills
        </div>
      </label>

      {isEditing ? (
        <input
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl"
          placeholder="JavaScript, React, Node.js"
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {value?.split(",").map((skill, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium border border-teal-200"
            >
              {skill.trim()}
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SkillsSection;
