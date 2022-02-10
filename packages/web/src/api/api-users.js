import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function getCurrentUser(authToken) {
  return http.get(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

function getUser(userId) {
  return http.get(`${baseUrl}/users`, {
    params: {
      id: userId,
    },
  });
}

function setCurrentUser(user) {
  return http.get(`${baseUrl}/users`, {
    data: user,
  });
}

function getUsers(page, limit, sort, order) {
  return http.get(`${baseUrl}/users`, {
    params: {
      limit: limit,
      page: page,
      sort: sort,
      order: order,
    },
  });
}

function deleteUser(authToken) {
  return http.delete(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

function updateUser(authToken, update) {
  return http.patch(`${baseUrl}/users/me`, update, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

function setUser(authToken, user) {
  return http.post(`${baseUrl}/users/me`, user, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

const usersApi = {
  getCurrentUser,
  getUser,
  setCurrentUser,
  getUsers,
  updateUser,
  setUser,
  deleteUser,
};

export default usersApi;
