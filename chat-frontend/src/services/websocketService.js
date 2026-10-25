import { WS_BASE_URL } from "../config";

let socket = null;


export function connectWebSocket(
  conversation_id,
  onMessage
) {

  if (socket) {
    socket.close();
  }

  const url = `${WS_BASE_URL}/ws/${conversation_id}`;

  console.log("Opening WebSocket:", url);
  socket = new WebSocket(url);


  socket.onopen = () => {

    console.log("WebSocket connected", url);
    onMessage?.({
      type: "USER_ONLINE",
      conversation_id,
    });

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "JOIN",
          conversation_id,
        })
      );
    }

  };


  socket.onmessage = (event) => {

    try {

      const data =
        JSON.parse(event.data);

      if (typeof onMessage === "function") {
        onMessage(data);
      }

    } catch (error) {

      console.error(
        "Invalid WebSocket message:",
        error
      );

    }
  };


  socket.onerror = (error) => {

    console.error("WebSocket error:", url, error);

  };


  socket.onclose = () => {

    console.log(
      "WebSocket disconnected"
    );
    onMessage?.({
      type: "USER_OFFLINE",
      conversation_id,
    });

  };


  return socket;

}


export function sendSocketMessage(
  payload
) {

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(
    JSON.stringify(payload)
  );

}


export function disconnectWebSocket() {

  if (socket) {

    socket.close();

    socket = null;

  }

}