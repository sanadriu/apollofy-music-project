import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function login(body) {
    return request({
      url: "/login",
      requestMethod: "POST",
      body: body,
    });
  }

  function signUp({ body, headers = {} }) {
    return request({
      url: "/sign-up",
      requestMethod: "POST",
      body: body,
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

  function search(headers) {
    return request({
      url: "/search",
      requestMethod: "GET",
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

  function getFollowersUsers(headers) {
    return request({
      url: "/me/users/followers",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getPopularUsers(headers) {
    return request({
      url: "/users/popular",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getTrackById(trackID) {
    return request({
      url: `/tracks/${trackID}`,
      requestMethod: "GET",
    });
  }

  function getTracks(headers) {
    return request({
      url: "/tracks",
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getPopularTracks(headers) {
    return request({
      url: "/tracks/popular",
      requestMethod: "GET",
      headers: headers,
    });
  }

  return {
    login: login,
    signUp: signUp,
    signOut: signOut,
    search: search,
    getUserById: getUserById,
    getUsers: getUsers,
    getFollowingUsers: getFollowingUsers,
    getFollowersUsers: getFollowersUsers,
    getPopularUsers: getPopularUsers,
  };
}

export default makeApi();
