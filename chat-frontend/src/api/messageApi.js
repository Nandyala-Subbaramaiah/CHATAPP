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

async function sendMessage(text) {
  try {
    setSending(true);

    await sendMessageApi(
      conversationId,
      currentUserId,
      text
    );

  } catch (error) {

    console.error(
      "Failed to send message:",
      error
    );

    throw error;

  } finally {

    setSending(false);

  }
}