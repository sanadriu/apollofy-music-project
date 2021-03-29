import { request } from "./api-utils";

function makeApi() {
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
    signUp: signUp,
    signOut: signOut,
  };
}

export default makeApi;
