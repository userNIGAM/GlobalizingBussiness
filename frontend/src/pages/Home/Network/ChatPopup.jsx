/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";

const ChatPopup = ({ company, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "Recruiter",
      text: "Hi! I'm the recruiter bot. Ask me about salary, benefits, location, company, or the job.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Basic chatbot replies
  const chatbotReply = (userMsg) => {
    let reply = "I'm not sure I understand. Could you rephrase?";

    if (userMsg.toLowerCase().includes("salary")) {
      reply = "The salary range for this position is $70k - $90k per year.";
    } else if (userMsg.toLowerCase().includes("benefits")) {
      reply = "We offer health insurance, paid leave, and a 401(k) plan.";
    } else if (userMsg.toLowerCase().includes("location")) {
      reply =
        "Our main office is in New York, but this role is remote-friendly.";
    } else if (userMsg.toLowerCase().includes("company")) {
      reply = `${company} is a leading innovator in the industry with a focus on growth and employee satisfaction.`;
    } else if (userMsg.toLowerCase().includes("job")) {
      reply =
        "This job requires experience in React, Node.js, and team collaboration.";
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "Recruiter", text: reply }]);
    }, 1000);
  };

  // Send message
  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { sender: "You", text: message }]);
    setIsTyping(true);
    chatbotReply(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl p-6 w-96 shadow-2xl flex flex-col"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <ChatHeader onClose={onClose} />
        
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
          chatEndRef={chatEndRef} 
        />
        
        <MessageInput
          message={message}
          setMessage={setMessage}
          onSend={handleSendMessage}
          onKeyDown={handleKeyDown}
        />
      </motion.div>
    </motion.div>
  );
};

export default ChatPopup;