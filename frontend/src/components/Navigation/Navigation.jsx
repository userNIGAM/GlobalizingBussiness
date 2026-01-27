import React, { useState, useRef, useEffect, useContext } from "react";
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
  Moon,
  Sun,
} from "lucide-react";
import ViewProfile from "./Profile/ViewProfile"; // Import the new profile component
import Notification from "./Navigation/Notification";
import Logo from "/logo.jpeg";
import ProfileDropDown from "./Profile/ProfileDropDown";
import { ThemeContext } from "../context/ThemeContext";

const Navigation = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewProfileOpen, setViewProfileOpen] = useState(false); // NEW STATE
  const [user, setUser] = useState({
    name: "User",
    role: "jobseeker",
    email: "user@example.com",
    phone: "1234567890",
    profilePic: null,
    isKycVerified: false,
  }); // Mock user data

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your profile has been approved!" },
    { id: 2, message: "New job posted: React Developer" },
    { id: 3, message: "Someone viewed your profile" },
    // add more dummy notifications here
  ]);
  const handleMarkAsRead = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };
  const settingsRef = useRef(null);

  const menuItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "networking", label: "Network", icon: Users },
    { id: "marketplace", label: "Marketplace", icon: Briefcase },
    { id: "collaboration", label: "Collaborate", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "help", label: "Help", icon: MessageSquare },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") {
        setSettingsOpen(false);
        setProfileOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      {/* NAVIGATION BAR */}
      <nav className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 shadow-sm transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo as Home */}
            <div
              className="flex items-center cursor-pointer shrink-0"
              onClick={() => setActiveTab("dashboard")}
            >
              <img src={Logo} alt="GSEM" className="h-8 w-8 object-contain" />
              <span className={`ml-2 text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>GSEM</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {menuItems
                .filter((item) => item.id !== "dashboard") // remove home from menu
                .map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                      activeTab === id
                        ? isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"
                        : isDark ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </button>
                ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search professionals, jobs, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-sm transition-colors ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>

              {/* Notifications */}
              <Notification />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? "text-yellow-400 hover:bg-gray-700"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Settings Dropdown */}
              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setSettingsOpen((prev) => !prev)}
                  className={`p-2 transition-colors ${
                    isDark
                      ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                </button>
                {settingsOpen && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg py-2 z-50 border transition-colors ${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}>
                    <button
                      onClick={() => {
                        setActiveTab("settings-account");
                        setSettingsOpen(false);
                      }}
                      className={`flex items-center px-4 py-2 text-sm w-full transition-colors ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <User size={16} className="mr-2" /> Account
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("settings-appearance");
                        setSettingsOpen(false);
                      }}
                      className={`flex items-center px-4 py-2 text-sm w-full transition-colors ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Appearance
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("settings-preferences");
                        setSettingsOpen(false);
                      }}
                      className={`flex items-center px-4 py-2 text-sm w-full transition-colors ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Preferences
                    </button>
                    <div className={`border-t my-1 ${isDark ? "border-gray-700" : ""}`} />
                    <button
                      onClick={() => {
                        setActiveTab("settings-signout");
                        setSettingsOpen(false);
                      }}
                      className={`flex items-center px-4 py-2 text-sm w-full transition-colors ${
                        isDark
                          ? "text-red-400 hover:bg-gray-700"
                          : "text-red-600 hover:bg-gray-100"
                      }`}
                    >
                      <LogIn size={16} className="mr-2" /> Sign out
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <ProfileDropDown />

              {/* Mobile Menu Toggle */}
              <button
                className={`md:hidden p-2 ${
                  isDark
                    ? "text-gray-300 hover:text-gray-100"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t shadow-sm animate-fade-in transition-colors ${
            isDark
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}>
            <div className="px-4 py-3 space-y-1">
              {menuItems
                .filter((item) => item.id !== "dashboard")
                .map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === id
                        ? isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"
                        : isDark ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </button>
                ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
