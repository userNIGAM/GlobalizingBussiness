/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

const MessageList = ({ messages, isTyping, chatEndRef }) => {
  const recruiterAvatar = "https://i.pravatar.cc/40?img=12";
  const userAvatar = "https://i.pravatar.cc/40?img=5";

  return (
    <div className="flex-1 overflow-y-auto space-y-2 mb-3 h-64">
      {messages.map((msg, i) => (
        <Message
          key={i}
          message={msg}
          recruiterAvatar={recruiterAvatar}
          userAvatar={userAvatar}
          index={i}
        />
      ))}

      {isTyping && <TypingIndicator avatar={recruiterAvatar} />}
      
      <div ref={chatEndRef} />
    </div>
  );
};

export default MessageList;