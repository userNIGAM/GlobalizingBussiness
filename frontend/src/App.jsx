import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Networking from "./components/Networking/Networking";
import Marketplace from "./components/Marketplace/Marketplace";
import Collaboration from "./components/Collaboration/Collaboration";
import Analytics from "./components/Analytics/Analytics";
import Login from "./components/Auth/LoginForm";
import CreateProfile from "./components/Profile/CreateProfile";
import Notifications from "./components/Notification/Notification";
import "./app.css";

function App() {
  const [userRole, setUserRole] = useState(null); // "recruiter" / "jobseeker" after login
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  // Switch content based on tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard userRole={userRole} />;
      case "networking":
        return <Networking />;
      case "marketplace":
        return <Marketplace searchQuery={searchQuery} />;
      case "collaboration":
        return <Collaboration />;
      case "analytics":
        return <Analytics />;
      case "notifications": // <-- add this
        return <Notifications />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  // Show login page if not logged in
  // if (!userRole) {
  //   return <Login setUserRole={setUserRole} />;
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Render tab content */}
      {renderContent()}

      {/* Route-based pages */}
      <Routes>
        <Route
          path="/create-profile"
          element={<CreateProfile setUserRole={setUserRole} />}
        />
        <Route
          path="/marketplace"
          element={<Marketplace searchQuery={searchQuery} />}
        />
        <Route
          path="/network"
          element={<Networking searchQuery={searchQuery} />}
        />
      </Routes>
    </div>
  );
}

export default App;
