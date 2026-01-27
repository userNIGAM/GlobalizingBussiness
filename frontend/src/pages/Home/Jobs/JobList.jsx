// components/JobList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { jobs } from "../../data/jobsData.js";

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobType === "all" || job.type.toLowerCase().includes(jobType);
    const matchesLocation = location === "all" || job.location.toLowerCase().includes(location);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
        <p className="text-gray-600">Browse through {jobs.length} job opportunities</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Jobs
            </label>
            <input
              type="text"
              placeholder="Job title or company"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="full">Full-time</option>
              <option value="part">Part-time</option>
              <option value="remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="kathmandu">Kathmandu</option>
              <option value="lalitpur">Lalitpur</option>
              <option value="pokhara">Pokhara</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                    <Link to={`/job/${job.id}`}>{job.title}</Link>
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {job.company} • {job.location}
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {job.type}
                    </span>
                    <span className="text-gray-700 font-medium">{job.salary}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Posted {job.postedDate}</span>
              </div>
              <p className="mt-4 text-gray-700 line-clamp-2">{job.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.requirements.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {job.requirements.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    +{job.requirements.length - 3} more
                  </span>
                )}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <Link
                  to={`/job/${job.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details →
                </Link>
                <Link
                  to={`/job/${job.id}`}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
      </div>
    </div>
  );
};

export default JobList;