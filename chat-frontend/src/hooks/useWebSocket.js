import {
  useEffect,
} from "react";

import {
  connectWebSocket,
  disconnectWebSocket,
} from "../services/websocketService";


function useWebSocket(
  conversation_id,
  onMessage
) {

  useEffect(() => {

    if (!conversation_id) {
      return;
    }


    const socket =
      connectWebSocket(
        conversation_id,
        onMessage
      );


    return () => {

      disconnectWebSocket();

    };

  }, [
    conversation_id,
    onMessage,
  ]);

}


export default useWebSocket;