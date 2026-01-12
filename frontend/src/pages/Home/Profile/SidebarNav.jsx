import { User, Settings, Shield, Eye, Database, Bell } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account Preferences", icon: Settings },
  { id: "security", label: "Sign-in & Security", icon: Shield },
  { id: "visibility", label: "Visibility", icon: Eye },
  { id: "privacy", label: "Data Privacy", icon: Database },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SidebarNav({ activeTab, onChange }) {
  return (
    <aside className="w-64 border-r bg-gradient-to-b from-gray-50/50 to-white/50 p-6">
      <h2 className="text-xl font-bold">Settings</h2>
      <p className="text-xs text-gray-500 mb-8">Manage your account</p>

      <nav className="space-y-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              activeTab === id
                ? "bg-blue-500 text-white shadow"
                : "text-gray-700 hover:bg-gray-100/50"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
