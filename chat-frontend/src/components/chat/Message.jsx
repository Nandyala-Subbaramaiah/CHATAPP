import React from "react";

function Message({ message, currentUserId }) {
  const createdAt = message.created_at || message.createdAt;
  const senderId = message.sender_id ?? message.senderId;
  const isOutgoing = String(senderId) === String(currentUserId);
  const time = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "Just now";

  return (
    <article className={`message-row${isOutgoing ? " message-row--outgoing" : ""}`}>
      <div className="message-bubble">
        {!isOutgoing && (
          <strong className="message-sender">
            {senderId ?? "User"}
          </strong>
        )}
        <p className="message-text">
          {message.message ?? message.content}
        </p>
        <time className="message-time" dateTime={createdAt || undefined}>
          {time}
        </time>
      </div>
    </article>
  );
}

export default Message;