import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getPlaylist = (playlistId, params) => {
  return http.get(`${baseUrl}/playlists/${playlistId}`, { params });
};

const getPlaylists = (params) => {
  return http.get(`${baseUrl}/playlists`, { params });
};

const getUserPlaylists = (authToken, params) => {
  return http.get(`${baseUrl}/me/playlists`, {
    headers: { Authorization: `Bearer ${authToken}` },
    params,
  });
};

const createPlaylist = (authToken, playlist) => {
  return http.post(`${baseUrl}/playlists`, playlist, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const updatePlaylist = (authToken, playlist) => {
  return http.patch(`${baseUrl}/playlists/${playlist.id}`, playlist, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const deletePlaylist = (authToken, playlistId) => {
  return http.delete(`${baseUrl}/playlists/${playlistId}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const followPlaylist = (authToken, playlistId) => {
  return http.patch(`${baseUrl}/playlists/${playlistId}/like`, undefined, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const playlistsApi = {
  getPlaylist,
  getPlaylists,
  getUserPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  followPlaylist,
};

export default playlistsApi;
