import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatBox from "./ChatBox";
import InputBox from "./InputBox";
import UserStatus from "./UserStatus";

const socket = io("http://localhost:5000");

const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        socket.on("activeUsers", (users) => {
            setActiveUsers(users);
        });

        return () => {
            socket.off("message");
            socket.off("activeUsers");
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit("message", { sender: "User", text: input });
            setInput("");
        }
    };

    return (
        <div>
            <UserStatus users={activeUsers} />
            <ChatBox messages={messages} />
            <InputBox input={input} setInput={setInput} sendMessage={sendMessage} />
        </div>
    );
};

export default App;
