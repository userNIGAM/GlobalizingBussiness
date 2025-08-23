import React, { useState } from "react";
import { Bell } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      content: "You have a new message from Jane.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "job",
      content: "New job posted that matches your profile.",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "network",
      content: "Alex sent you a connection request.",
      time: "3 days ago",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center space-x-2">
        <Bell className="h-6 w-6 text-blue-600" />
        <span>Notifications</span>
      </h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`border p-4 rounded-lg flex justify-between items-center ${
                notif.read ? "bg-gray-50" : "bg-blue-50 border-blue-300"
              }`}
            >
              <div>
                <p className="text-gray-800">{notif.content}</p>
                <p className="text-gray-500 text-sm">{notif.time}</p>
              </div>
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
