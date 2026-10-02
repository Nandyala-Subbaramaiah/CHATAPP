import React from "react";

import Message from "./Message";

function MessageList({
  messages = [],
  currentUserId,
}) {
  return (
    <section className="message-list" aria-label="Messages">
      {messages.length === 0 ? (
        <p className="empty-messages">No messages to show.</p>
      ) : (
        messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            currentUserId={currentUserId}
          />
        ))
      )}
    </section>
  );
}

export default MessageList;