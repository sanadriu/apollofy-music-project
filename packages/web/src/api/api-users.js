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

export function updateUser(authToken, update) {
  return http.patch({
    url: `${baseUrl}`,
    data: update,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export function updateNewUser(authToken, updatedUser) {
  return http.patch({
    url: `http://localhost:4000/users/me`,
    data: updatedUser,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
