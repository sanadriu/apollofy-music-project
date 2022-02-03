import React, { useState } from "react";

import { useUsers } from "../../../hooks/useUsers";

import UserDetail from "../../molecules/UserDetail";

export default function Playlists() {
  const { data: users } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <ul>
      {users?.data?.data?.map((user) => (
        <li key={user?.id}>
          <button type="button" onClick={() => setSelectedUser(user)}>
            <UserDetail user={user} />
          </button>
        </li>
      ))}
    </ul>
  );
}
