import React from "react";

function ChatHeader({
  conversation,
  conversationId,
  online,
  typing,
  searchQuery = "",
  onSearchChange,
}) {
  const name = conversation?.name || `Conversation ${conversationId || "-"}`;

  return (
    <header className="chat-header">
      <div className="chat-contact">
        <div className="avatar avatar--header" aria-hidden="true">
          {(name.trim().charAt(0) || "?").toUpperCase()}
        </div>
        <div className="chat-contact__details">
          <h2>
          {name}
          </h2>

        {typing ? (
          <p className="chat-contact__status chat-contact__status--typing">
            Typing...
          </p>
        ) : online ? (
          <p className="chat-contact__status">
            Online
          </p>
        ) : (
          <p className="chat-contact__status">
            Offline
          </p>
        )}
        </div>
      </div>

      <div className="chat-header__actions">
        <label className="search-field">
          <span className="visually-hidden">Search messages</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              onSearchChange?.(event.target.value)
            }
            placeholder="Search messages..."
          />
        </label>
      </div>
    </header>
  );
}

export default ChatHeader;