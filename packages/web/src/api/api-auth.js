import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function signUp(authToken) {
  return http.post(
    `${baseUrl}/sign-up`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
}

function signIn(authToken) {
  return http.post(
    `${baseUrl}/sign-in`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
}

function signOut(authToken) {
  return http.post(
    `${baseUrl}/sign-out`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
}

const authApi = {
  signUp,
  signIn,
  signOut,
};

export default authApi;
