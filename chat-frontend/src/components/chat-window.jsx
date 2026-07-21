import { useEffect, useState } from "react";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/subbu");

    ws.onopen = () => {
      console.log("Connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log(data);

      setMessages((prev) => [
        ...prev,
        data
      ]);
    };

    ws.onclose = () => {
      console.log("Disconnected");
    };

    setSocket(ws);

    // cleanup when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    socket.send(
      JSON.stringify({
        to: "rama",
        message: "Hello from subbu"
      })
    );
  };

  return (
    <div>
      <h2>Chat</h2>

      <button onClick={sendMessage}>
        Send Message
      </button>

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.from}: {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatWindow;