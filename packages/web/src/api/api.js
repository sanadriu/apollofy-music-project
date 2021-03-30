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

  return {
    login: login,
    signUp: signUp,
    signOut: signOut,
  };
}

export default makeApi();
