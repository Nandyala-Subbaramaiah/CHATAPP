import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";

import {
  getMessages,
  sendMessage as sendMessageApi,
} from "../api/messageApi";

import useWebSocket from "../hooks/useWebSocket";

function ChatPage() {
  const { conversationId } = useParams();
  const currentUserId = 1;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [online, setOnline] = useState(true);
  const [typing, setTyping] = useState(false);

  async function loadMessages() {
    try {
      setLoading(true);
      const data = await getMessages(conversationId);
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!conversationId) {
      return;
    }

    loadMessages();
  }, [conversationId]);

  const handleWebSocketMessage = useCallback((data) => {
    console.log("WebSocket event:", data);

    switch (data.type) {
      case "NEW_MESSAGE":
        setMessages((currentMessages) => {
          const exists = currentMessages.some(
            (message) => message.id === data.message.id
          );

          if (exists) {
            return currentMessages;
          }

          return [...currentMessages, data.message];
        });
        break;

      case "USER_ONLINE":
        setOnline(true);
        break;

      case "USER_OFFLINE":
        setOnline(false);
        break;

      case "TYPING_START":
        setTyping(true);
        break;

      case "TYPING_STOP":
        setTyping(false);
        break;

      default:
        console.log("Unknown event:", data.type);
    }
  }, []);

  useWebSocket(conversationId, handleWebSocketMessage, currentUserId);

  async function sendMessage(text) {
    try {
      setSending(true);
      await sendMessageApi(conversationId, currentUserId, text);
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-app-shell">
      <aside className="chat-sidebar">
        <div className="app-brand">
          <span className="brand-dot" />
          <span>ChatWave</span>
        </div>

        <div className="sidebar-section">
          <h3>Active chats</h3>

          <div className="conversation-item active">
            <div className="conversation-avatar">P</div>
            <div>
              <strong>Product Team</strong>
              <small>4 online</small>
            </div>
          </div>

          <div className="conversation-item">
            <div className="conversation-avatar alt">D</div>
            <div>
              <strong>Design Desk</strong>
              <small>2 offline</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="chat-panel">
        <ChatHeader
          conversation={{ name: "Product Team" }}
          conversationId={conversationId}
          online={online}
          typing={typing}
        />

        <MessageList
          messages={messages}
          loading={loading}
          currentUserId={currentUserId}
        />

        <MessageInput onSend={sendMessage} sending={sending} />
      </main>
    </div>
  );
}

export default ChatPage;