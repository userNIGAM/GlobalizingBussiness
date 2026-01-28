import React from "react";

const TypingIndicator = ({ avatar }) => (
  <div className="flex items-center gap-2">
    <img
      src={avatar}
      alt="Recruiter"
      className="w-8 h-8 rounded-full"
    />
    <div className="bg-gray-200 px-3 py-2 rounded-2xl rounded-bl-none shadow-md flex space-x-1">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
    </div>
  </div>
);

export default TypingIndicator;