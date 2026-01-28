import React from "react";

const ChatHeader = ({ onClose }) => (
  <div className="flex justify-between items-center border-b pb-2 mb-2">
    <h2 className="text-lg font-semibold">Chat with Recruiter</h2>
    <button
      onClick={onClose}
      className="text-gray-500 hover:text-red-500"
    >
      ✕
    </button>
  </div>
);

export default ChatHeader;