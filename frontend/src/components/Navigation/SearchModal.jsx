import React, { useEffect, useRef } from "react";
import { Search, X, Clock, TrendingUp } from "lucide-react";

const SearchModal = ({ isOpen, onClose, searchQuery, setSearchQuery, isDark }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const recentSearches = [
    "Frontend Developer",
    "UX Design Jobs",
    "Remote Marketing",
    "Project Manager",
  ];

  const trendingSearches = [
    { term: "AI Engineer", count: "1.2k" },
    { term: "Blockchain", count: "890" },
    { term: "Sustainable Tech", count: "654" },
  ];

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`absolute inset-x-0 top-0 pt-20 ${
        isDark ? "bg-gray-900" : "bg-white"
      } shadow-2xl rounded-b-3xl`}>
        <div className="max-w-3xl mx-auto px-4 pb-8">
          {/* Search Input */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search professionals, jobs, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-12 py-4 text-lg rounded-2xl focus:outline-none focus:ring-3 transition-all ${
                isDark
                  ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-500/50"
                  : "bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-400/50"
              }`}
            />
            <button
              onClick={onClose}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                isDark
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Recent Searches */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center space-x-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                <Clock className="h-4 w-4" />
                <span className="font-medium">Recent Searches</span>
              </div>
              <button className={`text-sm ${
                isDark ? "text-blue-400" : "text-blue-500"
              }`}>
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(term)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isDark
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Searches */}
          <div>
            <div className={`flex items-center space-x-2 mb-4 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}>
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">Trending Now</span>
            </div>
            <div className="space-y-3">
              {trendingSearches.map(({ term, count }, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(term)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    isDark
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg font-bold ${
                      isDark ? "text-gray-400" : "text-gray-400"
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <div className={`font-medium ${
                        isDark ? "text-gray-300" : "text-gray-900"
                      }`}>
                        {term}
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm px-2 py-1 rounded-full ${
                    isDark 
                      ? "bg-blue-900/30 text-blue-300" 
                      : "bg-blue-100 text-blue-600"
                  }`}>
                    {count} searches
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;