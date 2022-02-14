import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function getCurrentUser(authToken, { extend }) {
  return http.get(`${baseUrl}/users/me`, {
    headers: { Authorization: `Bearer ${authToken}` },
    params: { extend },
  });
}

function getUser(userId, { extend }) {
  return http.get(`${baseUrl}/users/${userId}`, {
    params: { extend },
  });
}

function getUsers({ page, limit, sort, order }) {
  return http.get(`${baseUrl}/users`, {
    params: { page, limit, sort, order },
  });
}

function deleteUser(authToken) {
  return http.delete(`${baseUrl}/users/me`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
}

function updateUser(authToken, user) {
  return http.patch(`${baseUrl}/users/me`, user, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
}

const usersApi = {
  getCurrentUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};

export default usersApi;
