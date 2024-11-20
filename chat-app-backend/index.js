const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express(); // Initialize Express
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, { cors: { origin: "*" } }); // Initialize Socket.IO

// Use CORS middleware
app.use(cors());

// Initialize an array to store active users
let activeUsers = [];

app.get("/", (req, res) => {
    res.send("Chat Application Backend is Running!");
});

// Handle socket connections
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Add the socket ID to the active users list
    activeUsers.push(socket.id);
    
    // Emit the updated list of active users to all connected clients
    io.emit("activeUsers", activeUsers);

    // Listen for incoming messages from clients
    socket.on("message", (data) => {
        console.log("Message:", data);
        io.emit("message", data); // Broadcast the message to all clients
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);

        // Remove the socket ID from the active users list
        activeUsers = activeUsers.filter((user) => user !== socket.id);

        // Emit the updated list of active users to all connected clients
        io.emit("activeUsers", activeUsers);
    });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
