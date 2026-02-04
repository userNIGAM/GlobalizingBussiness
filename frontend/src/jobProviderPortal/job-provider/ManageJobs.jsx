/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit, Eye, CheckCircle, XCircle, Loader } from 'lucide-react';
import { getProviderJobs, deleteJob, updateJobStatus } from '../../services/api';

const ManageJobs = ({ refreshTrigger }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedJob, setSelectedJob] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, [refreshTrigger]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getProviderJobs();
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to fetch jobs' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        setActionLoading(jobId);
        const response = await deleteJob(jobId);
        if (response.data.success) {
          setJobs(jobs.filter(j => j._id !== jobId));
          setMessage({ type: 'success', text: 'Job deleted successfully!' });
          setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: error.response?.data?.message || 'Failed to delete job' 
        });
      } finally {
        setActionLoading(null);
      }
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      setActionLoading(jobId);
      const response = await updateJobStatus(jobId, { status: newStatus });
      if (response.data.success) {
        setJobs(jobs.map(j => j._id === jobId ? { ...j, status: newStatus } : j));
        setMessage({ type: 'success', text: `Job ${newStatus} successfully!` });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update job' 
      });
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Manage Jobs</h2>
        <p className="text-gray-600">View and manage your job postings</p>
      </div>

      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {jobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">No jobs posted yet. Create your first job posting!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(job.status)}`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 font-semibold">Location</p>
                  <p className="text-sm font-bold text-gray-800">{job.location}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 font-semibold">Type</p>
                  <p className="text-sm font-bold text-gray-800">{job.type}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 font-semibold">Posted</p>
                  <p className="text-sm font-bold text-gray-800">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 font-semibold">Applicants</p>
                  <p className="text-sm font-bold text-gray-800">{job.applicants?.length || 0}</p>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Description:</span> {job.description.substring(0, 150)}...
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                >
                  <Eye size={16} />
                  View Details
                </button>

                {job.status !== 'closed' && (
                  <button
                    onClick={() => handleStatusChange(job._id, 'closed')}
                    disabled={actionLoading === job._id}
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    <XCircle size={16} />
                    Close Job
                  </button>
                )}

                {job.status === 'closed' && (
                  <button
                    onClick={() => handleStatusChange(job._id, 'active')}
                    disabled={actionLoading === job._id}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    <CheckCircle size={16} />
                    Reopen Job
                  </button>
                )}

                <button
                  onClick={() => handleDeleteJob(job._id)}
                  disabled={actionLoading === job._id}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-all"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedJob(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedJob.title}</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {selectedJob.requirements?.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {selectedJob.responsibilities?.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>

              {selectedJob.salaryRange && (
                <div>
                  <h4 className="font-semibold text-gray-700">Salary Range</h4>
                  <p className="text-gray-600">{selectedJob.salaryRange}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedJob(null)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ManageJobs;
