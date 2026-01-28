/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConnectionCard = ({
  name,
  position,
  company,
  skills,
  country,
  image,
  onConnect,
  isConnected,
}) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "Recruiter",
      text: "Hi! I’m the recruiter bot. Ask me about salary, benefits, location, company, or the job.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const recruiterAvatar = "https://i.pravatar.cc/40?img=12"; // Recruiter bot profile image
  const userAvatar = "https://i.pravatar.cc/40?img=5"; // User profile image

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
    }, 1000); // Simulate typing delay
  };

  // Send message
  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { sender: "You", text: message }]);
    setIsTyping(true);
    chatbotReply(message);
    setMessage("");
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-500">
        {position} @ {company}
      </p>
      <p className="text-sm text-gray-400">{country}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={onConnect}
          className={`px-4 py-2 rounded-lg font-medium ${
            isConnected
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={isConnected}
        >
          {isConnected ? "Connected" : "Connect"}
        </button>

        {isConnected && (
          <button
            onClick={() => setIsMessageOpen(true)}
            className="px-4 py-2 rounded-lg font-medium bg-purple-500 text-white hover:bg-purple-600"
          >
            Message Now
          </button>
        )}
      </div>

      {/* Chat Popup */}
      <AnimatePresence>
        {isMessageOpen && (
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
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h2 className="text-lg font-semibold">Chat with Recruiter</h2>
                <button
                  onClick={() => setIsMessageOpen(false)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-2 mb-3 h-64">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.sender === "You" ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.sender === "You" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-2xl max-w-[70%] shadow-md ${
                        msg.sender === "You"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-900 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="bg-gray-200 px-3 py-2 rounded-2xl rounded-bl-none shadow-md flex space-x-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Type your message..."
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMessageOpen && (
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
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h2 className="text-lg font-semibold">Chat with Recruiter</h2>
                <button
                  onClick={() => setIsMessageOpen(false)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-3 h-64">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.sender === "You" ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-end gap-2 ${
                      msg.sender === "You" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.sender !== "You" && (
                      <img
                        src={recruiterAvatar}
                        alt="Recruiter"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div
                      className={`px-3 py-2 rounded-2xl max-w-[70%] shadow-md ${
                        msg.sender === "You"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-900 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.sender === "You" && (
                      <img
                        src={userAvatar}
                        alt="You"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2">
                    <img
                      src={recruiterAvatar}
                      alt="Recruiter"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="bg-gray-200 px-3 py-2 rounded-2xl rounded-bl-none shadow-md flex space-x-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Type your message..."
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectionCard;
