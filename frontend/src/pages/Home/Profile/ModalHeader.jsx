import { X } from "lucide-react";

const descriptions = {
  profile: "Update your professional information",
  account: "Customize your account settings",
  security: "Manage your security preferences",
  visibility: "Control what others can see",
  privacy: "Manage your data and privacy",
  notifications: "Choose how you want to be notified",
};

export default function ModalHeader({ activeTab, onClose }) {
  return (
    <div className="relative p-6 border-b border-gray-200/30">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 capitalize">
            {activeTab.replace("-", " ")}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {descriptions[activeTab]}
          </p>
        </div>

        <button
          onClick={onClose}
          className="inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-gray-100/50 transition"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-green-500 to-pink-500" />
    </div>
  );
}
