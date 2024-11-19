const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express(); // Initialize Express
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, { cors: { origin: "*" } }); // Initialize Socket.IO

// Use CORS middleware
app.use(cors());

// Set up a basic route
app.get("/", (req, res) => {
    res.send("Chat Application Backend is Running!");
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listen for messages from clients
    socket.on("message", (data) => {
        console.log("Message received:", data);
        io.emit("message", data); // Broadcast message to all clients
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
