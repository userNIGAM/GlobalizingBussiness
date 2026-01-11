import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Networking from "./components/Networking/Networking";
import Marketplace from "./components/Marketplace/Marketplace";
import Collaboration from "./components/Collaboration/Collaboration";
import Analytics from "./components/Analytics/Analytics";
// import Login from "./components/Auth/LoginForm";
import CreateProfile from "./components/Profile/CreateProfile";
import Notifications from "./components/Notification/Notification";
import CreatePost from "./pages/CreatePost";
import "./App.css";
import Home from "./pages/Home/Home";

function App() {
  const [userRole, setUserRole] = useState(null); // "recruiter" / "jobseeker" after login
  const [searchQuery, setSearchQuery] = useState("");

  // Show login page if not logged in
  // if (!userRole) {
  //   return <Login setUserRole={setUserRole} />;
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* All content is now route-based */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={<Home userRole={userRole} />}
          />
          <Route
            path="/networking"
            element={<Networking searchQuery={searchQuery} />}
          />
          <Route
            path="/marketplace"
            element={<Marketplace searchQuery={searchQuery} />}
          />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route
            path="/create-profile"
            element={<CreateProfile setUserRole={setUserRole} />}
          />
          {/* Add a catch-all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
