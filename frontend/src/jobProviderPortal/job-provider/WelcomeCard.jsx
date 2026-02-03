/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const WelcomeCard = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-8 mb-8"
    >
      <h2 className="text-2xl font-bold mb-2">
        Welcome, {user?.name || "Job Provider"}!
      </h2>
      <p className="text-gray-600 mb-6">
        Manage your job postings and applications.
      </p>

      <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg">
        <Plus size={18} />
        Post New Job
      </button>
    </motion.div>
  );
};

export default WelcomeCard;
