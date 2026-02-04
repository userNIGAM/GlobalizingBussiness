/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Plus, Briefcase, FileText, LogOut } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase },
    { id: 'add-job', label: 'Add Jobs', icon: Plus },
    { id: 'manage-jobs', label: 'Manage Jobs', icon: Briefcase },
    { id: 'applications', label: 'View Applications', icon: FileText },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-indigo-600">Job Portal</h2>
        <p className="text-xs text-gray-500 mt-1">Provider Dashboard</p>
      </div>

      <nav className="mt-8 space-y-2 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 5 }}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-0 right-0 px-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
        >
          <LogOut size={18} />
          Logout
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
