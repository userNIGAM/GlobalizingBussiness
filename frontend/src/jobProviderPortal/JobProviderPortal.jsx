import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import DashboardHeader from "./job-provider/DashboardHeader";
import WelcomeCard from "./job-provider/WelcomeCard";
import StatsSection from "./job-provider/StatsSection";
import JobList from "./job-provider/JobList";

const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    applicants: 12,
    posted: "2 days ago",
    status: "active",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    applicants: 8,
    posted: "5 days ago",
    status: "active",
  },
];

const JobProviderPortal = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-100">
      <DashboardHeader onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <WelcomeCard user={user} />
        <StatsSection jobs={mockJobs} />
        <JobList jobs={mockJobs} />
      </div>
    </div>
  );
};

export default JobProviderPortal;
