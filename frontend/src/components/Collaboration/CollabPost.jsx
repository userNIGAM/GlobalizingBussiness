// CollabPost.jsx
import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const CollabPost = ({ user, offer, need, tags, avatar }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all"
  >
    <div className="flex items-center gap-3 mb-3">
      <img src={avatar} alt={user} className="w-10 h-10 rounded-full" />
      <p className="font-medium text-gray-900">{user}</p>
    </div>
    <p className="text-sm text-gray-800 mb-1">
      <span className="font-semibold">Offers:</span> {offer}
    </p>
    <p className="text-sm text-gray-800 mb-2">
      <span className="font-semibold">Needs:</span> {need}
    </p>
    <div className="flex gap-2 mb-3">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>
    <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
      <MessageCircle className="h-4 w-4" /> Message
    </button>
  </motion.div>
);

export default CollabPost;
