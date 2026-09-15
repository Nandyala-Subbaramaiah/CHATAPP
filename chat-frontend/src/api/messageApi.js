import { apiClient } from "./apiClient";

export async function getMessages(
  conversation_id
) {
  const response = await fetch(
    `http://127.0.0.1:8001/messages/${conversation_id}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load messages"
    );
  }

  return response.json();
}

export async function sendMessage(
  conversationId,
  senderId,
  text
) {
  const response = await fetch(
    "http://127.0.0.1:8001/messages/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        sender_id: senderId,
        message: text,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to send message"
    );
  }

  return response.json();
}