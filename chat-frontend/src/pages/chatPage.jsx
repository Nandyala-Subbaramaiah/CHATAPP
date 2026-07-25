import {
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
    loading,
    setLoading,
  ] = useState(true);

  const [
    sending,
    setSending,
  ] = useState(false);

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


  // -------------------------
  // Send message
  // -------------------------

  async function sendMessage(
    text
  ) {

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


  // -------------------------
  // UI
  // -------------------------

  return (

    <div>

      <ChatHeader
        conversationId={
          conversationId
        }
        online={
          online
        }
        typing={
          typing
        }
      />


      {loading ? (

        <p>
          Loading messages...
        </p>

      ) : (

        <MessageList
          messages={
            messages
          }
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

    </div>

  );

}


export default ChatPage;