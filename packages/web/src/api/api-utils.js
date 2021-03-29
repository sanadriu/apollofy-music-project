import axios from "axios";

export function createDefaultResponse() {
  return {
    isSuccessful: false,
    data: null,
    errorMessage: null,
  };
}

export async function normalizeResponse(promise) {
  const defaultResponse = createDefaultResponse();
  let networkResponse = null;

  try {
    networkResponse = await promise;
    defaultResponse.data = networkResponse.data;
  } catch (error) {
    defaultResponse.errorMessage = error.message;
  }

  return defaultResponse;
}

export async function request({
  url = "/",
  requestMethod = "GET",
  body = null,
  headers = null,
}) {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      Accept: "application/json",
    },
  });

  return normalizeResponse(
    api({
      url: url,
      method: requestMethod,
      data: body,
      headers: headers,
      validateStatus: function validateStatus(status) {
        // Resolve only if the status code is in the 200 range
        return status >= 200 && status < 400;
      },
    }),
  );
}
