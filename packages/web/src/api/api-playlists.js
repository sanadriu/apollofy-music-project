import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getPlaylist = async (playlistId) => {
  return http.get(`${baseUrl}/playlists/${playlistId}`);
};

const getPlaylists = async (limitNum = 10, pageNum = 1, userId = undefined) => {
  return http.get(`${baseUrl}/playlists`, {
    params: { limit: limitNum, page: pageNum, user: userId },
  });
};

const setPlaylist = async (authToken, playlist) => {
  return http.post(`${baseUrl}/playlists`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: playlist,
  });
};

const updatePlaylist = async (authToken, playlist) => {
  return http.post(`${baseUrl}/playlists/${playlist.id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: playlist,
  });
};

const deletePlaylist = async (authToken, playlistId) => {
  return http.post(`${baseUrl}/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: playlistId,
  });
};

const playlistsApi = {
  getPlaylist,
  getPlaylists,
  setPlaylist,
  updatePlaylist,
  deletePlaylist,
};

export default playlistsApi;
