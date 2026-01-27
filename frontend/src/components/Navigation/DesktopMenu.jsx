import React from "react";
import {
  Users,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Home,
  HelpCircle,
} from "lucide-react";

const iconMap = {
  dashboard: Home,
  networking: Users,
  marketplace: Briefcase,
  collaboration: MessageSquare,
  analytics: TrendingUp,
  help: HelpCircle,
};

const DesktopMenu = ({ menuItems, activeTab, setActiveTab, isDark }) => {
  return (
    <div className="hidden lg:flex items-center space-x-1 ml-10">
      {menuItems.map(({ id, label }) => {
        const Icon = iconMap[id];
        const isActive = activeTab === id;
        
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`relative px-4 py-2.5 rounded-lg mx-1 transition-all duration-300 group flex items-center space-x-2.5 ${
              isActive
                ? isDark
                  ? "bg-blue-900/30 text-blue-300"
                  : "bg-blue-50 text-blue-600"
                : isDark
                ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {/* Active Indicator */}
            {isActive && (
              <div className={`absolute inset-0 rounded-lg ring-2 ring-inset ${
                isDark 
                  ? "ring-blue-500/20" 
                  : "ring-blue-400/20"
              }`} />
            )}
            
            {/* Active Bar */}
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-8 rounded-t-full transition-all duration-300 ${
              isActive 
                ? isDark 
                  ? "bg-linear-to-r from-blue-400 to-cyan-400" 
                  : "bg-linear-to-r from-blue-500 to-cyan-500"
                : "opacity-0 group-hover:opacity-100 group-hover:bg-gray-400"
            }`} />
            
            {Icon && (
              <Icon className={`h-4.5 w-4.5 transition-transform duration-300 ${
                isActive ? "scale-110" : "group-hover:scale-110"
              }`} />
            )}
            <span className="text-sm font-semibold whitespace-nowrap">
              {label}
            </span>
            
            {/* Hover Effect */}
            <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isDark 
                ? "bg-linear-to-br from-gray-800/30 to-transparent" 
                : "bg-linear-to-br from-gray-100/50 to-transparent"
            }`} />
          </button>
        );
      })}
    </div>
  );
};

export default DesktopMenu;