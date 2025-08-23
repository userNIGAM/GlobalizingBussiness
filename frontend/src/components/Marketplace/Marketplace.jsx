// Marketplace.jsx
import React, { useState } from "react";
import { MapPin, Clock, X } from "lucide-react";
import jobsData from "./jobsData.js";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showMore, setShowMore] = useState({
    recent: false,
    like: false,
    local: false,
  });

  const JobCard = ({
    title,
    company,
    location,
    logo,
    type,
    salary,
    skills,
    onApply,
  }) => (
    <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition">
      {/* Left */}
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt={company}
          className="w-14 h-14 object-contain rounded"
        />
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{company}</p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {location}
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full border border-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-2">
        <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
          {type}
        </span>
        <span className="text-sm font-medium">{salary}</span>
        <button
          onClick={onApply}
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );

  const JobList = ({ type }) => (
    <div className="space-y-3">
      {(showMore[type] ? jobsData[type] : jobsData[type].slice(0, 2)).map(
        (job, i) => (
          <JobCard key={i} {...job} onApply={() => setSelectedJob(job)} />
        )
      )}
      <button
        onClick={() => setShowMore({ ...showMore, [type]: !showMore[type] })}
        className="w-full py-2 mt-1 border rounded text-gray-700 hover:bg-gray-100 text-sm"
      >
        {showMore[type] ? "Show Less" : "Show More"}
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Sections */}
      <div className="space-y-10">
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Recent Job Search
          </h2>
          <JobList type="recent" />
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">💡 Jobs You May Like</h2>
          <JobList type="like" />
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Local Job Post
          </h2>
          <JobList type="local" />
        </div>
      </div>

      {/* Apply Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={(e) => {
            // close if user clicks directly on overlay
            if (e.target.classList.contains("modal-overlay")) {
              setSelectedJob(null);
            }
          }}
        >
          <div
            className="modal-overlay bg-white rounded-lg p-6 w-full max-w-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Apply for {selectedJob.title}
              </h3>
              <button onClick={() => setSelectedJob(null)}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Application submitted for ${selectedJob.title}`);
                setSelectedJob(null);
              }}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                required
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Cover Letter"
                rows="4"
                className="w-full p-2 border rounded"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
