import React, { useState } from "react";

function MessageInput({
  onSend,
  sending,
}) {
  const [message, setMessage] = useState("");

  async function handleSend(event) {
    event?.preventDefault();

    if (!message.trim() || !onSend) {
      return;
    }

    try {
      await onSend(message);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  return (
    <form className="chat-composer" onSubmit={handleSend}>
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Write a message..."
        aria-label="Type a message"
      />

      <button type="submit" disabled={sending || !message.trim()}>
        {sending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

export default MessageInput;