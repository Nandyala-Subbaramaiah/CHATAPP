import {
  useEffect,
} from "react";

import {
  connectWebSocket,
  disconnectWebSocket,
} from "../services/websocketService";


function useWebSocket(
  conversationId,
  onMessage
) {

  useEffect(() => {

    if (!conversationId) {
      return;
    }


    const socket =
      connectWebSocket(
        conversationId,
        onMessage
      );


    return () => {

      disconnectWebSocket();

    };

  }, [
    conversationId,
    onMessage,
  ]);

}


export default useWebSocket;