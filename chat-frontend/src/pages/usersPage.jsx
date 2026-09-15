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
    <div>
      <h1>Users</h1>
      <button onClick={handleLogout}>Sign out</button>

      <UserList />
    </div>
  );
}

export default UsersPage;