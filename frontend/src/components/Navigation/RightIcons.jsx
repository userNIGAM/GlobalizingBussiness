import React, { useContext, useState } from "react";
import {
  Search,
  Settings,
  LogIn,
  User,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  MessageSquare,
  Plus,
  ChevronDown,
} from "lucide-react";
import Notification from "./Notification";
import ProfileDropDown from "../Profile/ProfileDropDown";
import { ThemeContext } from "../../context/ThemeContext";

const RightIcons = ({
  isDark,
  searchQuery,
  setSearchQuery,
  settingsOpen,
  setSettingsOpen,
  settingsRef,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  setSearchModalOpen,
}) => {
  const { toggleTheme } = useContext(ThemeContext);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      {/* Create New Button (Desktop) */}
      <button
        onClick={() => setActiveTab("create")}
        className={`hidden md:flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-300 font-medium group ${
          isDark
            ? "bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg"
            : "bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md"
        }`}
      >
        <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-sm">Create</span>
      </button>

      {/* Search - Desktop */}
      <div className="hidden md:block relative">
        <div className={`relative transition-all duration-300 ${
          searchFocused ? "w-72" : "w-56"
        }`}>
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <input
            type="text"
            placeholder="Search professionals, jobs, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`pl-10 pr-10 py-2.5 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 w-full ${
              isDark
                ? "bg-gray-800/70 border border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500/50 focus:border-blue-500"
                : "bg-gray-100/80 border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-400/50 focus:border-blue-400"
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                isDark
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              }`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Search - Mobile Trigger */}
      <button
        onClick={() => setSearchModalOpen(true)}
        className={`md:hidden p-2.5 rounded-lg transition-colors ${
          isDark
            ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Messages */}
      <button
        onClick={() => setActiveTab("messages")}
        className={`hidden sm:flex relative p-2.5 rounded-lg transition-colors group ${
          isDark
            ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
        aria-label="Messages"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
          3
        </span>
      </button>

      {/* Notifications */}
      <Notification isDark={isDark} />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`hidden sm:flex p-2.5 rounded-xl transition-all duration-300 group ${
          isDark
            ? "bg-gray-800 text-yellow-300 hover:bg-gray-700 hover:text-yellow-200"
            : "bg-gray-100 text-amber-500 hover:bg-gray-200 hover:text-amber-600"
        }`}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="h-5 w-5 group-hover:rotate-12 transition-transform" />
        ) : (
          <Moon className="h-5 w-5 group-hover:rotate-12 transition-transform" />
        )}
      </button>

      {/* Settings Dropdown */}
      <div className="relative" ref={settingsRef}>
        <button
          onClick={() => setSettingsOpen((prev) => !prev)}
          className={`hidden sm:flex items-center space-x-2 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
            isDark
              ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800 border border-gray-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200"
          } ${settingsOpen ? (isDark ? "bg-gray-800" : "bg-gray-100") : ""}`}
        >
          <Settings className="h-4.5 w-4.5 group-hover:rotate-90 transition-transform duration-300" />
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${
            settingsOpen ? "rotate-180" : ""
          }`} />
        </button>

        {settingsOpen && (
          <div
            className={`absolute right-0 mt-2 w-64 rounded-xl shadow-2xl py-2 z-50 border backdrop-blur-lg animate-fade-in ${
              isDark
                ? "bg-gray-900/95 border-gray-700"
                : "bg-white/95 border-gray-200"
            }`}
            style={{ animation: "slideDown 0.2s ease-out" }}
          >
            <div className="px-4 py-2 mb-2">
              <div className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                Settings
              </div>
            </div>
            
            <button
              onClick={() => {
                setActiveTab("settings-account");
                setSettingsOpen(false);
              }}
              className={`flex items-center px-4 py-3 text-sm w-full transition-all duration-200 group ${
                isDark
                  ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <User className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
              <span>Account Settings</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("settings-appearance");
                setSettingsOpen(false);
              }}
              className={`flex items-center px-4 py-3 text-sm w-full transition-all duration-200 group ${
                isDark
                  ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Settings className="h-4 w-4 mr-3 group-hover:rotate-90 transition-transform" />
              <span>Appearance</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("settings-preferences");
                setSettingsOpen(false);
              }}
              className={`flex items-center px-4 py-3 text-sm w-full transition-all duration-200 group ${
                isDark
                  ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <div className="h-4 w-4 mr-3 flex items-center justify-center">
                <div className={`h-2 w-2 rounded-full ${
                  isDark ? "bg-blue-400" : "bg-blue-500"
                }`} />
              </div>
              <span>Preferences</span>
            </button>

            <div className={`border-t mx-4 my-2 ${isDark ? "border-gray-800" : "border-gray-200"}`} />

            <button
              onClick={() => {
                setActiveTab("settings-signout");
                setSettingsOpen(false);
              }}
              className={`flex items-center px-4 py-3 text-sm w-full transition-all duration-200 group ${
                isDark
                  ? "text-red-400 hover:bg-gray-800 hover:text-red-300"
                  : "text-red-600 hover:bg-gray-100 hover:text-red-700"
              }`}
            >
              <LogIn className="h-4 w-4 mr-3 group-hover:-translate-x-1 transition-transform" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Dropdown */}
      <div className="hidden sm:block">
        <ProfileDropDown isDark={isDark} />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className={`md:hidden p-2.5 rounded-lg transition-all duration-300 ${
          isDark
            ? "text-gray-300 hover:text-white hover:bg-gray-800"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
        }`}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6 animate-rotate-in" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default RightIcons;