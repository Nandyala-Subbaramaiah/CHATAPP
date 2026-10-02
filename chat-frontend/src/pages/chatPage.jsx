import React, {
  useCallback,
  useEffect,
  useMemo,
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
import { getConversation } from "../api/conversationApi";

import useWebSocket from "../hooks/useWebSocket";


function ChatPage() {

  const {
    conversationId,
  } = useParams();


  // -------------------------
  // Temporary current user
  // -------------------------

  const currentUserId = 1;


  // -------------------------
  // State
  // -------------------------

  const [
    messages,
    setMessages,
  ] = useState([]);

  const [
    conversation,
    setConversation,
  ] = useState(null);

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    loadError,
    setLoadError,
  ] = useState("");

  const [
    sending,
    setSending,
  ] = useState(false);

  const [
    sendError,
    setSendError,
  ] = useState("");

  const [
    online,
    setOnline,
  ] = useState(false);

  const [
    typing,
    setTyping,
  ] = useState(false);


  // -------------------------
  // Load messages
  // -------------------------

  async function loadMessages() {

    try {

      setLoading(true);
      setLoadError("");

      const [data, conversationData] = await Promise.all([
        getMessages(conversationId),
        getConversation(conversationId),
      ]);

      setMessages(data);
      setConversation(conversationData);

    } catch (error) {

      console.error(
        "Failed to load messages:",
        error
      );
      setLoadError(
        "Couldn't load messages. Try again."
      );

    } finally {

      setLoading(false);

    }

  }


  // -------------------------
  // Load messages
  // when conversation changes
  // -------------------------

  useEffect(() => {

    if (!conversationId) {
      return;
    }

    loadMessages();

  }, [
    conversationId,
  ]);


  // -------------------------
  // WebSocket events
  // -------------------------

  const handleWebSocketMessage =
    useCallback((data) => {

      console.log(
        "WebSocket event:",
        data
      );


      switch (data.type) {

        case "NEW_MESSAGE":

          setMessages(
            (currentMessages) => {

              const exists =
                currentMessages.some(
                  (message) =>
                    message.id ===
                    data.message.id
                );

              if (exists) {
                return currentMessages;
              }

              return [
                ...currentMessages,
                data.message,
              ];

            }
          );

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

          console.log(
            "Unknown event:",
            data.type
          );

      }

    }, []);


  // -------------------------
  // WebSocket
  // -------------------------

  useWebSocket(
    conversationId,
    handleWebSocketMessage
  );

  const filteredMessages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return messages;
    }

    return messages.filter((message) => {
      const content = message.message ?? message.content ?? "";
      const sender = message.sender_id ?? message.senderId ?? "";

      return `${content} ${sender}`
        .toString()
        .toLowerCase()
        .includes(query);
    });
  }, [messages, searchQuery]);

  const otherParticipant = conversation?.participants?.find(
    (participant) => String(participant.user_id) !== String(currentUserId)
  );
  const conversationName =
    otherParticipant?.username || `Conversation ${conversationId || "-"}`;


  // -------------------------
  // Send message
  // -------------------------

  async function sendMessage(
    text
  ) {

    try {

      setSendError("");
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
      setSendError(
        "Message wasn't sent. Please try again."
      );

      throw error;

    } finally {

      setSending(false);

    }

  }


  // -------------------------
  // UI
  // -------------------------

  return (

    <main className="chat-shell">

      <ChatHeader
        conversation={{ name: conversationName }}
        conversationId={
          conversationId
        }
        online={
          online
        }
        typing={
          typing
        }
        searchQuery={
          searchQuery
        }
        onSearchChange={
          setSearchQuery
        }
      />


      {loading ? (

        <p className="chat-state">
          Loading messages...
        </p>

      ) : loadError ? (

        <div className="chat-state chat-state--error" role="alert">
          <p>{loadError}</p>
          <button className="text-button" onClick={loadMessages}>
            Retry
          </button>
        </div>

      ) : (

        <MessageList
          messages={filteredMessages}
          currentUserId={currentUserId}
        />

      )}


      <MessageInput
        onSend={
          sendMessage
        }
        sending={
          sending
        }
      />

      {sendError && (
        <p className="send-error" role="alert">
          {sendError}
        </p>
      )}

    </main>

  );

}


export default ChatPage;