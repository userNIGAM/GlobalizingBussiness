import { Plus, Briefcase } from 'lucide-react';
import JobCard from './JobCard';

const JobList = ({ jobs }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between mb-6">
        <h3 className="text-2xl font-bold">Your Job Postings</h3>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg">
          <Plus size={16} />
          New Job
        </button>
      </div>

      {jobs.length ? (
        <div className="space-y-4">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No job postings yet</p>
        </div>
      )}
    </div>
  );
};

export default JobList;
