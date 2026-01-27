/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { User, AlertCircle } from "lucide-react";
import { itemVariants } from "./animations";

const BioSection = ({ isEditing, value, error, onChange }) => {
  return (
    <motion.div variants={itemVariants} className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-500" />
          Bio / Professional Summary
        </div>
      </label>

      {isEditing ? (
        <>
          <textarea
            rows={4}
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none"
          />
          <div className="flex justify-between mt-2">
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <div className="text-sm text-gray-500 ml-auto">
              {(value?.length || 0)}/500 characters
            </div>
          </div>
        </>
      ) : (
        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700">
          {value}
        </div>
      )}
    </motion.div>
  );
};

export default BioSection;
