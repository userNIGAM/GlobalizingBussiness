/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Mail, Phone, Loader } from 'lucide-react';
import { getProviderJobs } from '../../services/api';

const ViewApplications = ({ refreshTrigger }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [message, setMessage] = useState({ type: '', text: '' });

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

  const handleApproveApplication = (jobId, applicationId) => {
    // This would call an API to approve the application
    setMessage({ type: 'success', text: 'Application approved!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleRejectApplication = (jobId, applicationId) => {
    // This would call an API to reject the application
    setMessage({ type: 'success', text: 'Application rejected!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  }

  const jobsWithApplications = jobs.filter(job => job.applications && job.applications.length > 0);
  
  const filteredApplications = selectedJob?.applications?.filter(app => 
    filterStatus === 'all' ? true : app.status === filterStatus
  ) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">View Applications</h2>
        <p className="text-gray-600">Review and manage applications from job seekers</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jobs List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Jobs</h3>
            
            {jobsWithApplications.length === 0 ? (
              <p className="text-gray-500 text-sm">No applications yet</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {jobsWithApplications.map((job) => (
                  <motion.button
                    key={job._id}
                    onClick={() => setSelectedJob(job)}
                    whileHover={{ x: 5 }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedJob?._id === job._id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-semibold text-sm">{job.title}</p>
                    <p className={`text-xs mt-1 ${
                      selectedJob?._id === job._id ? 'text-indigo-100' : 'text-gray-600'
                    }`}>
                      {job.applications?.length || 0} Applications
                    </p>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Applications Details */}
        <div className="lg:col-span-2">
          {selectedJob ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedJob.title}</h3>
                <p className="text-gray-600">{selectedJob.applications?.length || 0} total applications</p>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 mb-6 flex-wrap">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  All ({selectedJob.applications?.length || 0})
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === 'pending'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Pending ({selectedJob.applications?.filter(a => a.status === 'pending').length || 0})
                </button>
                <button
                  onClick={() => setFilterStatus('approved')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === 'approved'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Approved ({selectedJob.applications?.filter(a => a.status === 'approved').length || 0})
                </button>
                <button
                  onClick={() => setFilterStatus('rejected')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === 'rejected'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Rejected ({selectedJob.applications?.filter(a => a.status === 'rejected').length || 0})
                </button>
              </div>

              {/* Applications List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredApplications.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-500">No applications in this category</p>
                  </div>
                ) : (
                  filteredApplications.map((application, index) => (
                    <motion.div
                      key={application._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-800">Applicant Name</p>
                          <p className="text-sm text-gray-600">Applied on {new Date(application.appliedAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg mb-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Mail size={16} />
                          <span>applicant@email.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone size={16} />
                          <span>+1 (555) 123-4567</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Cover Letter:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...
                        </p>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {application.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveApplication(selectedJob._id, application._id)}
                              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all"
                            >
                              <CheckCircle size={16} />
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectApplication(selectedJob._id, application._id)}
                              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all"
                            >
                              <XCircle size={16} />
                              Reject
                            </button>
                          </>
                        )}
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all">
                          View Full Profile
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">Select a job to view applications</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ViewApplications;
