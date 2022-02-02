import axios from "axios";

export function getUser(authToken) {
  return axios.get(`http://localhost:4000/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export function deleteUser(authToken) {
  return axios.delete(`http://localhost:4000/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export function updateUser(authToken, username, email) {
  return axios.patch(`http://localhost:4000/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: { username: username && username, email: email && email },
  });
}

export function updateNewUser(authToken, updatedUser) {
  return axios({
    method: "patch",
    url: `http://localhost:4000/users/me`,
    data: updatedUser,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
