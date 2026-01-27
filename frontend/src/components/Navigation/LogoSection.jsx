import React from "react";
import Logo from "/logo.jpeg";
import { Home } from "lucide-react";

const LogoSection = ({ isDark, setActiveTab }) => {
  return (
    <div className="flex items-center">
      <div
        className="flex items-center cursor-pointer group"
        onClick={() => setActiveTab("dashboard")}
      >
        <div className="relative">
          <img 
            src={Logo} 
            alt="GSEM" 
            className="h-9 w-9 md:h-10 md:w-10 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105" 
          />
          <div className={`absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-blue-500/30 transition-all duration-300 ${
            isDark ? "group-hover:ring-blue-400/30" : "group-hover:ring-blue-500/30"
          }`} />
        </div>
        <div className="ml-3 flex flex-col">
          <span className={`text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r ${
            isDark 
              ? "from-blue-400 to-cyan-300" 
              : "from-blue-600 to-cyan-500"
          } bg-clip-text text-transparent`}>
            GSEM
          </span>
          <span className={`text-xs font-medium ${
            isDark ? "text-gray-400" : "text-gray-500"
          } hidden sm:block`}>
            Global Social Enterprise Market
          </span>
        </div>
      </div>
      
      {/* Mobile Home Button */}
      <button
        onClick={() => setActiveTab("dashboard")}
        className={`ml-4 p-2 rounded-lg md:hidden transition-all duration-200 ${
          isDark 
            ? "text-gray-300 hover:bg-gray-800 hover:text-white" 
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
        aria-label="Home"
      >
        <Home className="h-5 w-5" />
      </button>
    </div>
  );
};

export default LogoSection;