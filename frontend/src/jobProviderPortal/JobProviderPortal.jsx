import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import DashboardHeader from "./job-provider/DashboardHeader";
import Sidebar from "./job-provider/Sidebar";
import WelcomeCard from "./job-provider/WelcomeCard";
import StatsSection from "./job-provider/StatsSection";
import JobList from "./job-provider/JobList";
import AddJobForm from "./job-provider/AddJobForm";
import ManageJobs from "./job-provider/ManageJobs";
import ViewApplications from "./job-provider/ViewApplications";

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
  const [activeSection, setActiveSection] = useState("dashboard");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleJobAdded = () => {
    setActiveSection("manage-jobs");
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <DashboardHeader onLogout={handleLogout} />

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <>
              <WelcomeCard user={user} />
              <StatsSection jobs={mockJobs} />
              <JobList jobs={mockJobs} />
            </>
          )}

          {/* Add Jobs Section */}
          {activeSection === "add-job" && (
            <AddJobForm onJobAdded={handleJobAdded} />
          )}

          {/* Manage Jobs Section */}
          {activeSection === "manage-jobs" && (
            <ManageJobs refreshTrigger={refreshTrigger} />
          )}

          {/* View Applications Section */}
          {activeSection === "applications" && (
            <ViewApplications refreshTrigger={refreshTrigger} />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobProviderPortal;
