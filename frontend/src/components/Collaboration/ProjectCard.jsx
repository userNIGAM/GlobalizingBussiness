// ProjectCard.jsx
import React from "react";
import { MessageSquare, Users } from "lucide-react";
import { motion } from "framer-motion";

const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

const ProjectCard = ({ title, description, members }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
  >
    <div className="flex justify-between items-center mb-3">
      <p className="text-lg font-semibold text-gray-900">{title}</p>
      <MessageSquare className="h-5 w-5 text-gray-400" />
    </div>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="flex items-center gap-2 mb-4">
      {members.map((name, idx) => (
        <div
          key={idx}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${
            colors[idx % colors.length]
          }`}
        >
          {name.charAt(0)}
        </div>
      ))}
    </div>
    <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
      <Users className="h-4 w-4" /> Join Project
    </button>
  </motion.div>
);

export default ProjectCard;
