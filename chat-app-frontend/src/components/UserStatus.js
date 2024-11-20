import React from "react";

const UserStatus = ({ users }) => {
    return (
        <div>
            <h3>Online Users</h3>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserStatus;
