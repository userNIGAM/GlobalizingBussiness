import React from "react";
import {
  Home,
  Users,
  Briefcase,
  MessageSquare,
  TrendingUp,
  HelpCircle,
  Plus,
  Settings,
  Search,
  LogOut,
} from "lucide-react";

const iconMap = {
  dashboard: Home,
  networking: Users,
  marketplace: Briefcase,
  collaboration: MessageSquare,
  analytics: TrendingUp,
  help: HelpCircle,
};

const MobileMenu = ({
  open,
  menuItems,
  activeTab,
  setActiveTab,
  isDark,
  setOpen,
}) => {
  if (!open) return null;

  return (
    <div
      className={`md:hidden fixed inset-0 top-16 z-40 animate-slide-in ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20"
        onClick={() => setOpen(false)}
      />
      
      {/* Menu Panel */}
      <div className={`absolute right-0 top-0 w-80 h-full shadow-2xl ${
        isDark ? "bg-gray-900" : "bg-white"
      } transform transition-transform duration-300`}>
        <div className="p-6 overflow-y-auto h-full">
          {/* User Profile Section */}
          <div className="flex items-center space-x-3 mb-8 p-4 rounded-xl bg-linear-to-r from-blue-500/10 to-cyan-500/10">
            <div className="h-12 w-12 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <div className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                John Doe
              </div>
              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Premium Member
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1 mb-8">
            {menuItems.map(({ id, label }) => {
              const Icon = iconMap[id];
              const isActive = activeTab === id;
              
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? isDark
                        ? "bg-blue-900/30 text-blue-300"
                        : "bg-blue-50 text-blue-600"
                      : isDark
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {Icon && (
                      <Icon className={`h-5 w-5 transition-transform duration-300 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`} />
                    )}
                    <span className="font-medium">{label}</span>
                  </div>
                  {isActive && (
                    <div className={`h-1.5 w-1.5 rounded-full ${
                      isDark ? "bg-blue-400" : "bg-blue-500"
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className={`text-xs font-semibold uppercase tracking-wider mb-4 px-4 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}>
              Quick Actions
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}>
                <Plus className={`h-5 w-5 mb-2 ${
                  isDark ? "text-blue-400" : "text-blue-500"
                }`} />
                <span className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}>Create Post</span>
              </button>
              <button className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}>
                <Search className={`h-5 w-5 mb-2 ${
                  isDark ? "text-green-400" : "text-green-500"
                }`} />
                <span className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}>Find Jobs</span>
              </button>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={`border-t pt-6 ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}>
            <button
              onClick={() => {
                setActiveTab("settings");
                setOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl mb-3 transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("logout");
                setOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
                isDark
                  ? "text-red-400 hover:text-red-300 hover:bg-gray-800"
                  : "text-red-600 hover:text-red-700 hover:bg-gray-100"
              }`}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;