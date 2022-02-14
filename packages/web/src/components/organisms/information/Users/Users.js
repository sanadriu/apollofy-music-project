import React, { useState } from "react";

import { useFetchUsers } from "../../../../hooks/useUsers";

import UserDetail from "../../../molecules/UserDetail";

export default function Playlists() {
  const { data: users } = useFetchUsers();

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
