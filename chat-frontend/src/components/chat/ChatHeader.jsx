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
    <header>
      {/* User information */}
      <div>
        <h2>
          {name}
        </h2>

        {typing ? (
          <p>
            Typing...
          </p>
        ) : online ? (
          <p>
            Online
          </p>
        ) : (
          <p>
            Offline
          </p>
        )}
      </div>

      {/* Header actions */}
      <div>
        <label>
          Search messages
          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              onSearchChange?.(event.target.value)
            }
            placeholder="Search messages..."
          />
        </label>

        <button>
          More
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;