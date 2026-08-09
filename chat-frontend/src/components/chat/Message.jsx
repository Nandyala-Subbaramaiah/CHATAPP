import React from "react";

function Message({ message, currentUserId }) {
  const createdAt = message.created_at || message.createdAt;
  const senderId = Number(message.sender_id ?? message.senderId ?? 0);
  const isMine = Number(currentUserId) === senderId;
  const text = message.message ?? message.content ?? "";
  const senderLabel = isMine ? "You" : `User ${senderId || ""}`;

  return (
    <div className={`message-row ${isMine ? "mine" : "other"}`}>
      <div className={`message-bubble ${isMine ? "mine" : "other"}`}>
        {!isMine && (
          <span className="message-author">{senderLabel}</span>
        )}

        <p>{text}</p>

        <small>
          {createdAt
            ? new Date(createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Just now"}
        </small>
      </div>
    </div>
  );
}

export default Message;