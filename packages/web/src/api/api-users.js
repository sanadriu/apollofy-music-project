import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function getUser(authToken) {
  return http.get(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export function deleteUser(authToken) {
  return http.delete(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export function updateUser(authToken, username, email) {
  return http.patch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: { username: username && username, email: email && email },
  });
}
