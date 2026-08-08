import React from "react";

function ChatHeader({
  conversation,
  conversationId,
  online,
  typing,
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
        <button>
          Search
        </button>

        <button>
          More
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;