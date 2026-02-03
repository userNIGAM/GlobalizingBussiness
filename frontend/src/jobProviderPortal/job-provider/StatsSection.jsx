import StatsCard from './StatsCard';
import { Briefcase, Users, Eye, FileText } from 'lucide-react';

const StatsSection = ({ jobs }) => {
  const totalApplicants = jobs.reduce(
    (sum, job) => sum + job.applicants,
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatsCard title="Active Jobs" value={jobs.length} icon={Briefcase} />
      <StatsCard title="Applicants" value={totalApplicants} icon={Users} />
      <StatsCard title="View Rate" value="85%" icon={Eye} />
      <StatsCard title="Messages" value="12" icon={FileText} />
    </div>
  );
};

export default StatsSection;
