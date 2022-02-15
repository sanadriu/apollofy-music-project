import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function getCurrentUser(authToken, params) {
  return http.get(`${baseUrl}/users/me`, {
    headers: { Authorization: `Bearer ${authToken}` },
    params,
  });
}

function getUser(userId, params) {
  return http.get(`${baseUrl}/users/${userId}`, { params });
}

function getUsers(params) {
  return http.get(`${baseUrl}/users`, { params });
}

function getFollowedUsers(authToken, params) {
  return http.get(`${baseUrl}/users/me/followed-users`, {
    headers: { Authorization: `Bearer ${authToken}` },
    params,
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

function followUser(authToken, user) {
  return http.patch(`${baseUrl}/users/${user}/follow`, user, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

const usersApi = {
  getCurrentUser,
  getFollowedUsers,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  followUser,
};

export default usersApi;
