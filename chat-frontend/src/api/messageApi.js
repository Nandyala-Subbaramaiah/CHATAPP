import { apiClient } from "./apiClient";

export async function getMessages(
  conversationId
) {
  const response = await fetch(
    `http://localhost:8000/messages/${conversationId}`
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
    "http://localhost:8000/messages/",
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