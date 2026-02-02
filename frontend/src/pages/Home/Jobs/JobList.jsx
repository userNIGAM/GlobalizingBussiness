import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jobs } from "../../data/jobsData.js";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Star,
  TrendingUp,
  Bookmark,
  ExternalLink,
  ChevronDown,
  X
} from "lucide-react";

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [salaryRange, setSalaryRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(saved);
  }, []);

  const toggleSaveJob = (jobId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    let updatedSaved = [...savedJobs];
    if (updatedSaved.includes(jobId.toString())) {
      updatedSaved = updatedSaved.filter(id => id !== jobId.toString());
    } else {
      updatedSaved.push(jobId.toString());
    }
    
    setSavedJobs(updatedSaved);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSaved));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = jobType === "all" || job.type.toLowerCase().includes(jobType);
    const matchesLocation = location === "all" || job.location.toLowerCase().includes(location);
    const matchesExperience = experienceLevel === "all" || 
      (experienceLevel === "entry" && job.experience.includes("0-2")) ||
      (experienceLevel === "mid" && (job.experience.includes("2-5") || job.experience.includes("3-5"))) ||
      (experienceLevel === "senior" && job.experience.includes("5+"));
    
    return matchesSearch && matchesType && matchesLocation && matchesExperience;
  }).sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.postedDate) - new Date(a.postedDate);
      case "salary-high":
        return parseSalary(b.salary) - parseSalary(a.salary);
      case "salary-low":
        return parseSalary(a.salary) - parseSalary(b.salary);
      default:
        return 0;
    }
  });

  const parseSalary = (salary) => {
    const match = salary.match(/\$?(\d+(,\d+)*)/);
    return match ? parseInt(match[1].replace(/,/g, '')) : 0;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setJobType("all");
    setLocation("all");
    setExperienceLevel("all");
    setSalaryRange("all");
    setSortBy("newest");
  };

  const getJobCounts = () => {
    const types = {
      'Full-time': jobs.filter(j => j.type.includes('Full')).length,
      'Part-time': jobs.filter(j => j.type.includes('Part')).length,
      'Remote': jobs.filter(j => j.type.includes('Remote')).length,
      'Contract': jobs.filter(j => j.type.includes('Contract')).length
    };
    return types;
  };

  const jobCounts = getJobCounts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find Your <span className="text-blue-600">Dream Job</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover {jobs.length} curated job opportunities from top companies
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {Object.entries(jobCounts).map(([type, count]) => (
          <div key={type} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-900">{count}</div>
            <div className="text-gray-600">{type} Jobs</div>
          </div>
        ))}
      </div>

      {/* Main Search and Filter Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center"
            >
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filters
            </button>
            <select
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="salary-high">Salary: High to Low</option>
              <option value="salary-low">Salary: Low to High</option>
            </select>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          {[
            { value: "all", label: "All Jobs" },
            { value: "full", label: "Full-time" },
            { value: "part", label: "Part-time" },
            { value: "remote", label: "Remote" },
            { value: "kathmandu", label: "Kathmandu" },
            { value: "pokhara", label: "Pokhara" }
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                if (["full", "part", "remote"].includes(filter.value)) {
                  setJobType(filter.value);
                } else if (["kathmandu", "pokhara"].includes(filter.value)) {
                  setLocation(filter.value);
                } else {
                  setJobType("all");
                  setLocation("all");
                }
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                (filter.value === jobType || filter.value === location) 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="full">Full-time</option>
                  <option value="part">Part-time</option>
                  <option value="remote">Remote</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="all">All Locations</option>
                  <option value="kathmandu">Kathmandu</option>
                  <option value="lalitpur">Lalitpur</option>
                  <option value="pokhara">Pokhara</option>
                  <option value="biratnagar">Biratnagar</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (2-5 years)</option>
                  <option value="senior">Senior Level (5+ years)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Clear all filters
              </button>
              <span className="text-sm text-gray-600">
                {filteredJobs.length} jobs found
              </span>
            </div>
          </div>
        )}
      </div>

      {/* View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${viewMode === "grid" ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${viewMode === "list" ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          >
            List
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          Sorted by: <span className="font-medium">{sortBy.replace('-', ' ')}</span>
        </div>
      </div>

      {/* Job Listings */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <Link to={`/job/${job.id}`} className="block p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h2>
                      <button
                        onClick={(e) => toggleSaveJob(job.id, e)}
                        className="ml-2 shrink-0"
                      >
                        <Bookmark className={`w-5 h-5 ${
                          savedJobs.includes(job.id.toString()) 
                            ? 'text-blue-600 fill-current' 
                            : 'text-gray-400 hover:text-blue-600'
                        }`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <Building className="w-4 h-4 mr-2 shrink-0" />
                      <span className="truncate">{job.company}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="flex items-center text-gray-700 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center text-gray-700 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 line-clamp-2 text-sm">
                    {job.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.requirements.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.requirements.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                      +{job.requirements.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center text-green-700 font-semibold">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                  <span className="text-sm text-gray-500">
                    {job.postedDate}
                  </span>
                </div>
              </Link>
              
              <div className="px-6 pb-6">
                <Link
                  to={`/job/${job.id}`}
                  className="block w-full px-6 py-3 bg-blue-600 text-white text-center font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Company/Logo Area */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Building className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  
                  {/* Job Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          <Link to={`/job/${job.id}`}>{job.title}</Link>
                        </h2>
                        <div className="flex items-center mt-1">
                          <p className="text-gray-600">
                            {job.company} • {job.location}
                          </p>
                          <span className="ml-3 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => toggleSaveJob(job.id, e)}
                          className="shrink-0"
                        >
                          <Bookmark className={`w-5 h-5 ${
                            savedJobs.includes(job.id.toString()) 
                              ? 'text-blue-600 fill-current' 
                              : 'text-gray-400 hover:text-blue-600'
                          }`} />
                        </button>
                        <span className="text-sm text-gray-500">{job.postedDate}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.requirements.slice(0, 5).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-6">
                        <span className="text-green-700 font-semibold">
                          <DollarSign className="w-4 h-4 inline mr-1" />
                          {job.salary}
                        </span>
                        <span className="text-gray-700">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {job.experience}
                        </span>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Link
                          to={`/job/${job.id}`}
                          className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Save
                        </Link>
                        <Link
                          to={`/job/${job.id}`}
                          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No jobs found</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
          </p>
          <button
            onClick={clearFilters}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Results Summary */}
      {filteredJobs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredJobs.length}</span> of{" "}
                <span className="font-semibold">{jobs.length}</span> jobs
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Updated just now • {new Date().toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Set up job alerts
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Load More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;