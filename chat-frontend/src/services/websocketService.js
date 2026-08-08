let socket = null;


export function connectWebSocket(
  conversation_id,
  onMessage
) {

  if (socket) {
    socket.close();
  }

  socket = new WebSocket(
    `ws://localhost:8000/ws/${conversation_id}`
  );


  socket.onopen = () => {

    console.log(
      "WebSocket connected"
    );

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

    console.error(
      "WebSocket error:",
      error
    );

  };


  socket.onclose = () => {

    console.log(
      "WebSocket disconnected"
    );

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