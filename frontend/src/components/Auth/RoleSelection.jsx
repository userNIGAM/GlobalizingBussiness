import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users } from 'lucide-react';

const RoleSelection = ({ onSelectRole }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.4
      }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4"
    >
      <div className="max-w-4xl w-full">
        <motion.div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to GlobalizingBusiness
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Select your role to get started
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Job Seeker Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => onSelectRole('jobSeeker')}
            className="cursor-pointer"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full border-2 border-transparent hover:border-blue-500 transition-colors">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                  <Users size={40} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Job Seeker
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                I'm looking for job opportunities and want to connect with employers
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Browse job listings
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Apply for positions
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Build your profile
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Network with professionals
                </li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                Continue as Job Seeker
              </button>
            </div>
          </motion.div>

          {/* Job Provider Card */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => onSelectRole('jobProvider')}
            className="cursor-pointer"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full border-2 border-transparent hover:border-indigo-500 transition-colors">
              <div className="flex justify-center mb-6">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-full">
                  <Briefcase size={40} className="text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Job Provider
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                I want to post jobs and hire talented professionals
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Post job openings
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Manage applications
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Build company profile
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Access job analytics
                </li>
              </ul>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors">
                Continue as Job Provider
              </button>
            </div>
          </motion.div>
        </div>

        <motion.p className="text-center text-gray-600 dark:text-gray-400 mt-10">
          You can change your role later in your account settings
        </motion.p>
      </div>
    </motion.div>
  );
};

export default RoleSelection;
