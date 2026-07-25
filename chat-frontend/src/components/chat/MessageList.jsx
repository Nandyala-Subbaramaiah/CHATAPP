import {
  useEffect,
  useState,
} from "react";

import {
  getMessages,
} from "../../api/messageApi";

import Message from "./Message";

function MessageList({
  conversationId,
}) {
  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadMessages() {
      try {
        const data =
          await getMessages(
            conversationId
          );

        setMessages(data);
      } catch (error) {
        console.error(
          "Failed to load messages:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    if (conversationId) {
      loadMessages();
    }
  }, [conversationId]);

  if (loading) {
    return (
      <p>
        Loading messages...
      </p>
    );
  }

  return (
    <div>
      {messages.map(
        (message) => (
          <Message
            key={message.id}
            message={message}
          />
        )
      )}
    </div>
  );
}

export default MessageList;