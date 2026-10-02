import React from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  startConversation,
} from "../../api/conversationApi";

function UserItem({ user }) {

  const navigate =
    useNavigate();
  const name = user.name || user.username || "Unknown user";


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

    <article className="user-item">
      <div className="avatar" aria-hidden="true">
        {(name.trim().charAt(0) || "?").toUpperCase()}
      </div>
      <span className="user-item__name">{name}</span>
      <button
        className="user-item__action"
        onClick={handleChat}
      >
        Message
      </button>
    </article>

  );

}

export default UserItem;