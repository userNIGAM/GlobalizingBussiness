/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Camera, AlertCircle } from "lucide-react";
import { imageVariants, itemVariants } from "./animations";

const ProfileImage = ({
  isEditing,
  imagePreview,
  error,
  onImageChange
}) => {
  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-3">
      <div className="relative group">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="relative"
        >
          <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
            <img
              src={
                imagePreview ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {isEditing && (
            <motion.label
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-3 right-3 bg-linear-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-full shadow-lg cursor-pointer"
            >
              <Camera className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageChange}
              />
            </motion.label>
          )}
        </motion.div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </motion.div>
  );
};

export default ProfileImage;
