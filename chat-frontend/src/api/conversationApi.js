import { apiClient } from "./apiClient";

export function getConversation(
  conversationId
) {
  return apiClient(
    `/api/conversations/${conversationId}`
  );
}

export async function startConversation(
  userId
) {
  const response = await fetch(
    `http://localhost:8000/conversations/start/${userId}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to start conversation"
    );
  }

  return response.json();
}