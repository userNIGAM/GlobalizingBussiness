import React, { useState, useEffect } from "react";
import ConnectionCard from "./ConnectionCard";

const Networking = () => {
  const [connectedPeople, setConnectedPeople] = useState([]);
  const userId = "test_user_123";

  const connections = [
    {
      id: "alice1",
      name: "Alice Johnson",
      position: "CEO",
      company: "TechCorp",
      skills: ["Leadership", "Business Strategy", "AI Solutions"],
      country: "USA",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "bob1",
      name: "Bob Smith",
      position: "Marketing Head",
      company: "BizSolutions",
      skills: ["Digital Marketing", "SEO", "Branding"],
      country: "UK",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      id: "charlie1",
      name: "Charlie Brown",
      position: "Product Manager",
      company: "InnovateX",
      skills: ["Product Design", "Agile", "UI/UX"],
      country: "Australia",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
      id: "priya1",
      name: "Priya Kapoor",
      position: "Software Engineer",
      company: "CodeSphere",
      skills: ["React", "Node.js", "GraphQL"],
      country: "India",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: "lucas1",
      name: "Lucas Martins",
      position: "Data Scientist",
      company: "DataVision",
      skills: ["Machine Learning", "Python", "Data Analytics"],
      country: "Brazil",
      image: "https://randomuser.me/api/portraits/men/88.jpg",
    },
    {
      id: "yuki1",
      name: "Yuki Tanaka",
      position: "UI Designer",
      company: "PixelPerfect",
      skills: ["Figma", "Adobe XD", "Illustration"],
      country: "Japan",
      image: "https://randomuser.me/api/portraits/women/15.jpg",
    },
  ];

  useEffect(() => {
    fetch(`http://localhost:8000/api/connections/${userId}`)
      .then((res) => res.json())
      .then((data) => setConnectedPeople(data.map((c) => c.connectedUserId)))
      .catch((err) => console.error("Error fetching connections:", err));
  }, []);

  const handleConnect = async (id) => {
    if (connectedPeople.includes(id)) return; // already connected

    const payload = { userId, connectedUserId: id };
    console.log("Sending payload to backend:", payload);

    try {
      const res = await fetch("http://localhost:8000/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setConnectedPeople((prev) => [...prev, id]);
      } else {
        alert(data.message || "Failed to connect");
      }
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {connections.map((conn) => (
        <ConnectionCard
          key={conn.id}
          {...conn}
          onConnect={() => handleConnect(conn.id)}
          isConnected={connectedPeople.includes(conn.id)}
        />
      ))}
    </div>
  );
};

export default Networking;
