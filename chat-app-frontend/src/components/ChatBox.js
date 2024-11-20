import React from "react";

const ChatBox = ({ messages }) => {
    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
            {messages.map((message, index) => (
                <div key={index}>
                    <strong>{message.sender}:</strong> {message.text}
                </div>
            ))}
        </div>
    );
};

export default ChatBox;
