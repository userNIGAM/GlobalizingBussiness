import React from "react";

const MessageInput = ({ message, setMessage, onSend, onKeyDown }) => (
  <div className="flex gap-2">
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={onKeyDown}
      className="flex-1 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Type your message..."
    />
    <button
      onClick={onSend}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Send
    </button>
  </div>
);

export default MessageInput;