import React from "react";

import UserList from "../components/users/UserList";
import { logout } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function UsersPage() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main className="contacts-shell">
      <header className="contacts-header">
        <div>
          <p className="eyebrow">CHATAPP</p>
          <h1>Chats</h1>
        </div>
        <button className="text-button" onClick={handleLogout}>Sign out</button>
      </header>
      <p className="contacts-hint">Choose someone to start a conversation.</p>
      <UserList />
    </main>
  );
}

export default UsersPage;