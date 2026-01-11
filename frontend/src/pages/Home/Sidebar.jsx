import React from 'react';
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  TrendingUp,
  Hash,
  Calendar,
  BookOpen,
  Target,
  Zap
} from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: <Home size={24} />, label: 'Feed', active: true },
    { icon: <Users size={24} />, label: 'Network', count: 12 },
    { icon: <Briefcase size={24} />, label: 'Jobs', count: 5 },
    { icon: <MessageSquare size={24} />, label: 'Messages', count: 3 },
    { icon: <Bell size={24} />, label: 'Notifications', count: 8 },
  ];

  const topics = [
    { name: 'Artificial Intelligence', posts: '2.4k' },
    { name: 'Remote Work', posts: '1.8k' },
    { name: 'Web3', posts: '892' },
    { name: 'Sustainability', posts: '1.2k' },
  ];

  return (
    <div className="sticky top-8">
      {/* Navigation */}
      <div className="bg-linear-to-b from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                item.active 
                  ? 'bg-linear-to-r from-purple-50 to-blue-50 text-blue-700 border border-purple-100' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-linear-to-b from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp size={20} className="text-purple-600" />
            Trending Topics
          </h3>
          <Hash size={20} className="text-gray-400" />
        </div>
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.name} className="group cursor-pointer">
              <div className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-purple-700">
                    {topic.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{topic.posts} posts today</p>
                </div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-3 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors">
          Show More
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
        <Zap size={24} className="mb-3" />
        <h4 className="font-bold text-lg mb-2">Boost Your Profile</h4>
        <p className="text-sm opacity-90 mb-4">Get 2x more visibility for 7 days</p>
        <button className="w-full py-2 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
          Try Free Trial
        </button>
      </div>
    </div>
  );
}