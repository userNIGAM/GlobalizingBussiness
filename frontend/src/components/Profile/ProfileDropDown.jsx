import React, { useState } from "react";
import {
  Home,
  Users,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Network,
  Search,
  Bell,
  Settings,
  User,
  ChevronDown,
  LogIn,
  UserPlus,
  Menu,
  X,
} from "lucide-react";
import ViewProfile from "./ViewProfile"; // Import the new profile component

const ProfileDropDown = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [viewProfileOpen, setViewProfileOpen] = useState(false); // NEW STATE

  const [user, setUser] = useState({
    name: "User",
    role: "jobseeker",
    email: "user@example.com",
    phone: "1234567890",
    profilePic: null,
    isKycVerified: false,
  }); // Mock user data
  return (
    <div className="relative">
      <button
        onClick={() => setProfileOpen((prev) => !prev)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <User className="h-5 w-5 text-white" />
          )}
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {profileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
          <button
            onClick={() => {
              setViewProfileOpen(true);
              setProfileOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
          >
            <User size={16} className="mr-2" /> View Profile
          </button>
          <button
            onClick={() => {
              setActiveTab("auth-logout");
              setProfileOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
          >
            <LogIn size={16} className="mr-2" /> Logout
          </button>
        </div>
      )}
      {viewProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setViewProfileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <ViewProfile user={user} setUser={setUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
