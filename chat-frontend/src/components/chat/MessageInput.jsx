import React, { useState } from "react";

function MessageInput({
  onSend,
  sending,
}) {
  const [message, setMessage] =
    useState("");

  async function handleSend(event) {
    event.preventDefault();

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
    <form className="message-composer" onSubmit={handleSend}>
      <input
        aria-label="Type a message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message..."
      />
      <button
        className="send-button"
        type="submit"
        disabled={sending || !message.trim()}
      >
        {sending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

export default MessageInput;