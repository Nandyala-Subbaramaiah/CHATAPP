import React, {
  useEffect,
  useState,
} from "react";

import {
  getMessages,
} from "../../api/messageApi";

import Message from "./Message";

function MessageList({
  messages = [],
  loading = false,
}) {
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