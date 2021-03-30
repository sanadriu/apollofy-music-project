import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function login(headers) {
    return request({
      url: "/login",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function signUp(headers) {
    return request({
      url: "/sign-up",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function signOut(headers) {
    return request({
      url: "/sign-out",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function getUserById(userID) {
    return request({
      url: `/users/${userID}`,
      requestMethod: "GET",
    });
  }

  function getUsers(headers) {
    return request({
      url: "/users",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getFollowingUsers(headers) {
    return request({
      url: "/me/users/following",
      requestMethod: "GET",
      headers: headers,
    });
  }

  return {
    login: login,
    signUp: signUp,
    signOut: signOut,
    getUserById: getUserById,
    getUsers: getUsers,
    getFollowingUsers: getFollowingUsers,
  };
}

export default makeApi();
