import {
  useEffect,
} from "react";

import {
  connectWebSocket,
  disconnectWebSocket,
} from "../services/websocketService";


function useWebSocket(
  conversation_id,
  onMessage,
  userId
) {

  useEffect(() => {

    if (!conversation_id) {
      return;
    }


    const socket =
      connectWebSocket(
        conversation_id,
        onMessage,
        userId
      );


    return () => {

      disconnectWebSocket();

    };

  }, [
    conversation_id,
    onMessage,
    userId,
  ]);

}


export default useWebSocket;