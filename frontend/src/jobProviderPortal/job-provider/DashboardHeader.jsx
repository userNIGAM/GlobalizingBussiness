/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Briefcase, LogOut } from 'lucide-react';

const DashboardHeader = ({ onLogout }) => {
  return (
    <div className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Job Provider Portal</h1>
            <p className="text-sm text-gray-600">
              Manage jobs and applicants
            </p>
          </div>
        </motion.div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
