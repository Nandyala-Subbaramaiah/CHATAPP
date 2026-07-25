import {
  useNavigate,
} from "react-router-dom";

import {
  startConversation,
} from "../../api/conversationApi";

function UserItem({ user }) {

  const navigate =
    useNavigate();


  async function handleChat() {

    try {

      const data =
        await startConversation(
          user.id
        );

      navigate(
        `/chat/${data.conversation_id}`
      );

    } catch (error) {

      console.error(
        "Failed to start chat:",
        error
      );

    }

  }


  return (

    <div>

      <span>
        {user.name}
      </span>

      <button
        onClick={
          handleChat
        }
      >
        Chat
      </button>

    </div>

  );

}

export default UserItem;