import React, { useState } from "react";
import { Bell, UserPlus } from "lucide-react";

const Notification = () => {
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
  return (
    <div className="relative">
      <button
        className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
        onClick={() => setNotificationsOpen((prev) => !prev)}
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length > 99 ? "99+" : notifications.length}
          </span>
        )}
      </button>

      {/* Notification dropdown */}
      {notificationsOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">
                No new notifications
              </p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 rounded"
                >
                  <span className="text-sm text-gray-700">{notif.message}</span>
                  <button
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() => handleMarkAsRead(notif.id)}
                  >
                    Mark as read
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
