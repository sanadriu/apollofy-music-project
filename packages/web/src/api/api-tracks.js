import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getTrack = async (trackId) => {
  return http.get(`${baseUrl}/tracks/${trackId}`);
};

const getTracks = async (limitNum = 10, pageNum = 1, genreName = "") => {
  return http.get(`${baseUrl}/tracks?limit=${limitNum}&page=${pageNum}&genre=${genreName}`);
};

const getMyTracks = async (authToken, params = {}) => {
  const { page = 1, sort = "created_at", order = "asc", limit = 10, extend = false } = params;

  return http.get(`${baseUrl}/me/tracks`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    params: {
      page,
      sort,
      order,
      limit,
      extend,
    },
  });
};

const setTrack = async (authToken, data) => {
  return http.post(`${baseUrl}/tracks`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

const updateTrack = async (authToken, id, data) => {
  return http.patch(`${baseUrl}/tracks/${id}`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

const deleteTrack = async (authToken, id) => {
  return http.delete(`${baseUrl}/tracks/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

const tracksApi = {
  getTrack,
  getTracks,
  getMyTracks,
  setTrack,
  updateTrack,
  deleteTrack,
};

export default tracksApi;
