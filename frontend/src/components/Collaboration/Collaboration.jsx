// Collaboration.jsx
import React from "react";
import ProjectCard from "./ProjectCard";
import CollabPost from "./CollabPost";
import { Plus } from "lucide-react";

const Collaboration = () => {
  const projects = [
    {
      title: "Global Marketing",
      description:
        "Collaborative project for expanding brand reach internationally.",
      members: ["Alice", "Bob", "Eve"],
    },
    {
      title: "New Product Launch",
      description: "Team working on the innovative AI-powered product release.",
      members: ["Charlie", "Diana", "Frank"],
    },
  ];

  const collabPosts = [
    {
      user: "Sara Khan",
      offer: "I can teach Adobe Illustrator",
      need: "Looking to learn UI/UX design",
      tags: ["Illustrator", "UIUX"],
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      user: "David Li",
      offer: "I can teach JavaScript",
      need: "Looking for someone to teach me Spanish",
      tags: ["JavaScript", "Spanish"],
      avatar: "https://i.pravatar.cc/150?img=12",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Section: Featured Projects */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} {...proj} />
        ))}
      </div>

      {/* Section: Collaboration Posts */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Collaboration Posts
      </h2>
      <div className="space-y-4">
        {collabPosts.map((post, idx) => (
          <CollabPost key={idx} {...post} />
        ))}
      </div>

      {/* Floating Button */}
      <button className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Collaboration;
