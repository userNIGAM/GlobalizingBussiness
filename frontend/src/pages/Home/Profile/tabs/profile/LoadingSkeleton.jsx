/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { loadingVariants } from "./animations";

const LoadingSkeleton = () => {
  return (
    <motion.div
      animate="animate"
      variants={loadingVariants}
      className="space-y-8"
    >
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 rounded-2xl bg-gray-300 animate-pulse" />
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-300 rounded-lg w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded-lg w-1/2 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;
