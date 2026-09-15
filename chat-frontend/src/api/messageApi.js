import { apiClient } from "./apiClient";

export async function getMessages(
  conversation_id
) {
  return apiClient(`/messages/${conversation_id}`);
}

export async function sendMessage(
  conversationId,
  senderId,
  text
) {
  return apiClient("/messages/", {
    method: "POST",
    body: JSON.stringify({
      conversation_id: conversationId,
      sender_id: senderId,
      message: text,
    }),
  });
}