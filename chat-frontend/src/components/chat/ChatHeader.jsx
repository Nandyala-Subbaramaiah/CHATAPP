import React from "react";

function ChatHeader({
  conversation,
  conversationId,
  online,
  typing,
}) {
  const name = conversation?.name || `Conversation ${conversationId || "-"}`;

  return (
    <header className="chat-header">
      <div className="chat-header-profile">
        <div className="chat-avatar">D</div>

        <div className="chat-header-text">
          <h2>{name}</h2>

          <p>
            {typing
              ? "Typing..."
              : online
                ? "Online now"
                : "Offline"}
          </p>
        </div>
      </div>

      <div className="chat-header-actions">
        <button className="icon-button" type="button">
          Search
        </button>

        <button className="icon-button" type="button">
          More
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;