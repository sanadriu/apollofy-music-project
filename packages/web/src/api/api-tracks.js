import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getTrack = (trackId, params) => {
  return http.get(`${baseUrl}/tracks/${trackId}`, { params });
};

const getTracks = (params) => {
  return http.get(`${baseUrl}/tracks`, { params });
};

const getUserTracks = (authToken, params) => {
  return http.get(`${baseUrl}/users/me/tracks`, {
    headers: { Authorization: `Bearer ${authToken}` },
    params,
  });
};

const createTrack = (authToken, track) => {
  return http.post(`${baseUrl}/tracks`, track, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const updateTrack = (authToken, track) => {
  return http.patch(`${baseUrl}/tracks/${track.id}`, track, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const deleteTrack = (authToken, trackId) => {
  return http.delete(`${baseUrl}/tracks/${trackId}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const likeTrack = (authToken, trackId) => {
  return http.patch(`${baseUrl}/tracks/${trackId}/like`, undefined, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const playTrack = (authToken, trackId) => {
  return http.patch(`${baseUrl}/tracks/${trackId}/play`, undefined, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const tracksApi = {
  getTrack,
  getTracks,
  getUserTracks,
  createTrack,
  updateTrack,
  deleteTrack,
  likeTrack,
  playTrack,
};

export default tracksApi;
