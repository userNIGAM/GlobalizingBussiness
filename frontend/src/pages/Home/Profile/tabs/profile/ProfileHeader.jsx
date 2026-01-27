/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Edit2, X } from "lucide-react";
import { itemVariants } from "./animations";

const ProfileHeader = ({ isEditing, onToggle }) => {
  return (
    <div className="relative bg-linear-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-200/50">
      <div className="flex items-center justify-between">
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-gray-900"
        >
          Personal Profile
        </motion.h1>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={onToggle}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              isEditing
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-linear-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
            }`}
          >
            {isEditing ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileHeader;
