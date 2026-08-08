import React from "react";

function Message({ message }) {
  const createdAt = message.created_at || message.createdAt;

  return (
    <div>
      <strong>
        {message.sender_id ?? message.senderId ?? "User"}
      </strong>

      <p>
        {message.message ?? message.content}
      </p>

      <small>
        {createdAt
          ? new Date(createdAt).toLocaleString()
          : "Just now"}
      </small>
    </div>
  );
}

export default Message;