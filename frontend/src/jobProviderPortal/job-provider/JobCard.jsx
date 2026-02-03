/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Users, Eye, Trash2 } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg p-6 hover:shadow-md"
    >
      <div className="flex justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold">{job.title}</h4>
          <p className="text-sm text-gray-600">Posted {job.posted}</p>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {job.status}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Users size={16} />
          {job.applicants} Applicants
        </div>

        <div className="flex gap-3">
          <button className="text-indigo-600">
            <Eye size={18} />
          </button>
          <button className="text-red-600">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
