import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getTrack = (trackId, { extend }) => {
  return http.get(`${baseUrl}/tracks/${trackId}`, {
    params: { extend },
  });
};

const getTracks = ({ page, limit, sort, order, genre, userId }) => {
  return http.get(`${baseUrl}/tracks`, {
    params: { page, limit, sort, order, genre, user: userId },
  });
};

const getUserTracks = (authToken, { page, limit, sort, order, extend }) => {
  return http.get(`${baseUrl}/me/tracks`, {
    headers: { Authorization: `Bearer ${authToken}` },
    params: { page, limit, sort, order, extend },
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
