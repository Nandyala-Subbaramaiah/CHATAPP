import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";

import UserItem from "./UserItem";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();

        setUsers(data);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p className="chat-state">Loading contacts...</p>;
  }

  if (error) {
    return <p className="chat-state chat-state--error" role="alert">{error}</p>;
  }

  return (
    <section className="user-list" aria-label="Contacts">
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
        />
      ))}
      {users.length === 0 && <p className="empty-messages">No contacts found.</p>}
    </section>
  );
}

export default UserList;