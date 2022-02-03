import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function getCurrentUser(authToken) {
  return http.get(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

const getUser = async (userId) => {
  return http.get(`${baseUrl}/users`, {
    params: {
      id: userId,
    },
  });
}

const getUsers = async (page, limit, sort, order) => {
  return http.get(`${baseUrl}/users`, {
    params: {
      limit: limit,
      page: page,
      sort: sort,
      order: order
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

function updateUser(authToken, username, email) {
  return http.patch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: { username: username && username, email: email && email },
  });
}

function updateNewUser(authToken, updatedUser) {
  return http.patch({
    url: `${baseUrl}/users/me`,
    data: updatedUser,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

const usersApi = {
  getCurrentUser,
  getUser,
  getUsers,
  updateUser,
  updateNewUser,
  deleteUser,
};

export default usersApi;
