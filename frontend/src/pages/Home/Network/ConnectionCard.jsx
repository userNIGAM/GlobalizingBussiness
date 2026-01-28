/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatPopup from "./ChatPopup";

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
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    await onConnect();
    setIsConnecting(false);
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
      
      <SkillsList skills={skills} />
      
      <ActionButtons 
        isConnected={isConnected}
        isConnecting={isConnecting}
        onConnect={handleConnect}
        onMessage={() => setIsMessageOpen(true)}
      />

      <AnimatePresence>
        {isMessageOpen && (
          <ChatPopup
            company={company}
            onClose={() => setIsMessageOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SkillsList = ({ skills }) => (
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
);

const ActionButtons = ({ isConnected, isConnecting, onConnect, onMessage }) => (
  <div className="mt-4 flex gap-2">
    <ConnectButton 
      isConnected={isConnected}
      isConnecting={isConnecting}
      onConnect={onConnect}
    />
    
    {isConnected && (
      <MessageButton onMessage={onMessage} />
    )}
  </div>
);

const ConnectButton = ({ isConnected, isConnecting, onConnect }) => (
  <button
    onClick={onConnect}
    className={`px-4 py-2 rounded-lg font-medium transition ${
      isConnected
        ? "bg-green-500 text-white cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }`}
    disabled={isConnected || isConnecting}
  >
    {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect"}
  </button>
);

const MessageButton = ({ onMessage }) => (
  <button
    onClick={onMessage}
    className="px-4 py-2 rounded-lg font-medium bg-purple-500 text-white hover:bg-purple-600"
  >
    Message Now
  </button>
);

export default ConnectionCard;