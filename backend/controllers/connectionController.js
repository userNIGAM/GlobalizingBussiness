import Connection from "../models/Connection.js";
import User from "../models/User.js";

// Create a connection
export async function createConnection(req, res) {
  try {
    const { userId, connectedUserId } = req.body;

    // Validate both users exist
    const userExists = await User.findById(userId);
    const connectedUserExists = await User.findById(connectedUserId);

    if (!userExists || !connectedUserExists) {
      return res.status(404).json({
        success: false,
        message: "One or both users not found",
      });
    }

    // Check if connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { userId, connectedUserId },
        { userId: connectedUserId, connectedUserId: userId },
      ],
    });

    if (existingConnection) {
      return res.status(400).json({
        success: false,
        message: "Connection already exists",
      });
    }

    // Create new connection
    const connection = new Connection({
      userId,
      connectedUserId,
      status: "accepted",
    });

    await connection.save();

    res.status(201).json({
      success: true,
      message: "Connected successfully",
      connection,
    });
  } catch (error) {
    console.error("Create connection error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Get user connections
export async function getUserConnections(req, res) {
  try {
    const { userId } = req.params;

    // Get all connections where user is either userId or connectedUserId
    const connections = await Connection.find({
      $or: [{ userId }, { connectedUserId: userId }],
      status: "accepted",
    })
      .populate("userId", "name email profilePicture")
      .populate("connectedUserId", "name email profilePicture");

    // Format response to return connected user details
    const connectedUsers = connections.map((conn) => {
      return conn.userId._id.toString() === userId
        ? conn.connectedUserId
        : conn.userId;
    });

    res.json({
      success: true,
      connections: connectedUsers,
      count: connectedUsers.length,
    });
  } catch (error) {
    console.error("Get connections error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Check if users are connected
export async function checkConnection(req, res) {
  try {
    const { userId, connectedUserId } = req.query;

    const connection = await Connection.findOne({
      $or: [
        { userId, connectedUserId },
        { userId: connectedUserId, connectedUserId: userId },
      ],
      status: "accepted",
    });

    res.json({
      success: true,
      isConnected: !!connection,
    });
  } catch (error) {
    console.error("Check connection error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Remove connection
export async function removeConnection(req, res) {
  try {
    const { userId, connectedUserId } = req.body;

    const result = await Connection.findOneAndDelete({
      $or: [
        { userId, connectedUserId },
        { userId: connectedUserId, connectedUserId: userId },
      ],
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Connection not found",
      });
    }

    res.json({
      success: true,
      message: "Connection removed successfully",
    });
  } catch (error) {
    console.error("Remove connection error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
