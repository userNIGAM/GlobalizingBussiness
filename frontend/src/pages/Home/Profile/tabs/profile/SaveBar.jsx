/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const SaveBar = ({ isEditing, onSave, onCancel, hasErrors }) => {
  return (
    <AnimatePresence>
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex gap-4 justify-end pt-6 border-t border-gray-200"
        >
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            disabled={hasErrors}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 ${
              hasErrors
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-linear-to-r from-green-500 to-emerald-500 text-white"
            }`}
          >
            <Check className="w-5 h-5" />
            Save Changes
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SaveBar;
