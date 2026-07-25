import { useState } from "react";

import {
  sendMessage,
} from "../../api/messageApi";

function MessageInput({
  conversationId,
}) {
  const [message, setMessage] =
    useState("");

  const [sending, setSending] =
    useState(false);

  async function handleSend() {
    if (!message.trim()) {
      return;
    }

    try {
      setSending(true);

      await sendMessage(
        conversationId,
        message
      );

      setMessage("");
    } catch (error) {
      console.error(
        "Failed to send message:",
        error
      );
    } finally {
      setSending(false);
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