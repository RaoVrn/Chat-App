import React from "react";

const InputBox = ({ input, setInput, sendMessage }) => {
    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                style={{ width: "300px", padding: "10px" }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default InputBox;
