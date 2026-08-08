import React, { useState } from "react";

function MessageInput({
  onSend,
  sending,
}) {
  const [message, setMessage] =
    useState("");

  async function handleSend() {
    if (!message.trim() || !onSend) {
      return;
    }

    try {
      await onSend(message);
      setMessage("");
    } catch (error) {
      console.error(
        "Failed to send message:",
        error
      );
    }
  }

  return (
    <div>
      <input
        value={message}
        onChange={(event) =>
          setMessage(
            event.target.value
          )
        }
        placeholder="Type a message..."
      />

      <button
        onClick={handleSend}
        disabled={sending}
      >
        {sending
          ? "Sending..."
          : "Send"}
      </button>
    </div>
  );
}

export default MessageInput;