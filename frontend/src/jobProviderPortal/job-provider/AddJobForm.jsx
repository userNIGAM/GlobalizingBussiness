/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, AlertCircle, CheckCircle } from 'lucide-react';
import { postJob } from '../../services/api';

const AddJobForm = ({ onJobAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: [''],
    responsibilities: [''],
    salaryRange: '',
    applicationDeadline: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayField = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: newArray.length > 0 ? newArray : [''],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Validate required fields
      if (!formData.title || !formData.location || !formData.description) {
        setMessage({ type: 'error', text: 'Please fill in all required fields' });
        setLoading(false);
        return;
      }

      const response = await postJob(formData);
      
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Job posted successfully!' });
        setFormData({
          title: '',
          location: '',
          type: 'Full-time',
          description: '',
          requirements: [''],
          responsibilities: [''],
          salaryRange: '',
          applicationDeadline: '',
        });
        
        if (onJobAdded) {
          setTimeout(() => onJobAdded(), 1500);
        }
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to post job' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Post a New Job</h2>
        <p className="text-gray-600 mb-6">Fill in the details to create a job posting</p>

        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {message.text}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Senior React Developer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {/* Location and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., San Francisco, CA"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Employment Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Salary Range
            </label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleInputChange}
              placeholder="e.g., $80,000 - $120,000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the job role, responsibilities, and key details..."
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Requirements
            </label>
            <div className="space-y-3">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleArrayChange(index, 'requirements', e.target.value)}
                    placeholder="e.g., 5+ years of React experience"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField(index, 'requirements')}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addArrayField('requirements')}
              className="mt-3 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <Plus size={18} />
              Add Requirement
            </button>
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Responsibilities
            </label>
            <div className="space-y-3">
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleArrayChange(index, 'responsibilities', e.target.value)}
                    placeholder="e.g., Develop responsive UI components"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  {formData.responsibilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField(index, 'responsibilities')}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addArrayField('responsibilities')}
              className="mt-3 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <Plus size={18} />
              Add Responsibility
            </button>
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Application Deadline
            </label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddJobForm;
