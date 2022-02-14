import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getTrack = (trackId) => {
  return http.get(`${baseUrl}/tracks/${trackId}`);
};

const getTracks = (page, genre, limit, sort, order, userId) => {
  return http.get(`${baseUrl}/tracks`, {
    params: {
      limit: limit,
      page: page,
      genre: genre,
      sort: sort,
      order: order,
      user: userId,
    },
  });
};

const getInfiniteTracks = (url) => {
  return http.get(url);
};

const getMyTracks = (authToken, params = {}) => {
  const { page = 1, sort = "created_at", order = "asc", limit = 10, extend = false } = params;

  return http.get(`${baseUrl}/users/me/tracks`, {
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

const setTrack = (authToken, track) => {
  return http.post(`${baseUrl}/tracks`, track, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

const updateTrack = (authToken, track) => {
  return http.patch(`${baseUrl}/tracks/${track.id}`, track, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

const deleteTrack = (authToken, id) => {
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
  getInfiniteTracks,
  deleteTrack,
};

export default tracksApi;
