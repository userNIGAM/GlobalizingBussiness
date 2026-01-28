/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const Message = ({ message, recruiterAvatar, userAvatar, index }) => (
  <motion.div
    initial={{ opacity: 0, x: message.sender === "You" ? 50 : -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex items-end gap-2 ${
      message.sender === "You" ? "justify-end" : "justify-start"
    }`}
  >
    {message.sender !== "You" && (
      <img
        src={recruiterAvatar}
        alt="Recruiter"
        className="w-8 h-8 rounded-full"
      />
    )}
    
    <div
      className={`px-3 py-2 rounded-2xl max-w-[70%] shadow-md ${
        message.sender === "You"
          ? "bg-blue-500 text-white rounded-br-none"
          : "bg-gray-200 text-gray-900 rounded-bl-none"
      }`}
    >
      {message.text}
    </div>
    
    {message.sender === "You" && (
      <img
        src={userAvatar}
        alt="You"
        className="w-8 h-8 rounded-full"
      />
    )}
  </motion.div>
);

export default Message;