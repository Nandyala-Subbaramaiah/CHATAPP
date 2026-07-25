import { useEffect, useState } from "react";
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
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
}

export default UserList;