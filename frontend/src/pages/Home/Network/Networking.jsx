import React, { useState } from "react";
import ConnectionCard from "./ConnectionCard";
import { connections } from "./data";

const Networking = () => {
  const [connectedPeople, setConnectedPeople] = useState([]);
  const userId = "test_user_123";

  // useEffect(() => {
  //   fetch(`http://localhost:8000/api/connections/${userId}`)
  //     .then((res) => res.json())
  //     .then((data) => setConnectedPeople(data.map((c) => c.connectedUserId)))
  //     .catch((err) => console.error("Error fetching connections:", err));
  // }, []);

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
