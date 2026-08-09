import React from "react";

import Message from "./Message";

function MessageList({
  messages = [],
  loading = false,
  currentUserId,
}) {
  if (loading) {
    return (
      <div className="message-list empty-state">
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="message-list empty-state">
          <p>No messages yet. Start the conversation.</p>
        </div>
      ) : (
        messages.map((message) => (
          <Message
            key={message.id || `${message.sender_id}-${message.created_at}`}
            message={message}
            currentUserId={currentUserId}
          />
        ))
      )}
    </div>
  );
}

export default MessageList;