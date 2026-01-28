import React, { useState, useEffect, useContext } from "react";
import ConnectionCard from "./ConnectionCard";
import { connections } from "./data";
import { AuthContext } from "../../../context/AuthContext";
import { getUserConnections, createConnection } from "../../../services/api";

const Networking = () => {
  const [connectedPeople, setConnectedPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const userId = user?._id || "test_user_123";

  // Fetch existing connections on component mount
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await getUserConnections(userId);

        if (response.data.success && response.data.connections) {
          const connectedIds = response.data.connections.map((c) => c._id);
          setConnectedPeople(connectedIds);
        }
      } catch (err) {
        console.error("Error fetching connections:", err);
      }
    };

    if (userId && userId !== "test_user_123") {
      fetchConnections();
    }
  }, [userId]);

  const handleConnect = async (id) => {
    if (connectedPeople.includes(id)) return; // already connected

    const payload = { userId, connectedUserId: id };
    setLoading(true);

    try {
      const response = await createConnection(payload);

      if (response.data.success) {
        setConnectedPeople((prev) => [...prev, id]);
        console.log("Connected successfully to user:", id);
      } else {
        console.error(response.data.message || "Failed to connect");
      }
    } catch (error) {
      console.error("Error connecting:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading && (
        <div className="text-center mb-4 text-gray-600">
          Connecting...
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((conn) => (
          <ConnectionCard
            key={conn.id}
            {...conn}
            onConnect={() => handleConnect(conn.id)}
            isConnected={connectedPeople.includes(conn.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Networking;
