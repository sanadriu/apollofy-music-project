import axios from "axios";

export function getUser(id) {
  return axios.get(`http://localhost:4000/users/${id}`);
}

export function deleteUser(authToken) {
  return axios.post(`http://localhost:4000/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export function updateUser(authToken, username = "", email = "") {
  return axios.post(`http://localhost:4000/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      data: { username: username, email: email },
    },
  });
}
