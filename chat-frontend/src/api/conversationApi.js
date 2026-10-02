import { apiClient } from "./apiClient";

export function getConversation(
  conversationId
) {
  return apiClient(`/conversations/${conversationId}`);
}

export async function startConversation(
  userId
) {
  return apiClient(`/conversations/start/${userId}`, {
    method: "POST",
  });
}