import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getPlaylist = async (playlistId) => {
  return http.get(`${baseUrl}/playlists/${playlistId}`);
}

const getPlaylists = async (limitNum = 10, pageNum = 1) => {
  return http.get(`${baseUrl}/playlists?_limit=${limitNum}&_page=${pageNum}`);
}

const setPlaylist = async (playlist) => {
  return http.post(`${baseUrl}/playlists`, playlist);
}

const playlistsApi = {
  getPlaylist,
  getPlaylists,
  setPlaylist,
};

export default playlistsApi;
