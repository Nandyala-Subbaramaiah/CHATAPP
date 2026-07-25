function ChatHeader({
  conversation,
  online,
  typing,
}) {
  if (!conversation) {
    return null;
  }

  return (
    <header>
      {/* User information */}
      <div>
        <h2>
          {conversation.name}
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