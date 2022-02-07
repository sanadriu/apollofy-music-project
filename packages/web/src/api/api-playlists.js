import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getPlaylist = async (playlistId) => {
  return http.get(`${baseUrl}/playlists/${playlistId}`);
};

const getPlaylists = async (limitNum = 10, pageNum = 1) => {
  return http.get(`${baseUrl}/playlists?limit=${limitNum}&page=${pageNum}`);
};

const getMyPlaylists = async (authToken, params = {}) => {
  const { page = 1, sort = "created_at", order = "asc", limit = 10, extend = false } = params;

  return http.get(`${baseUrl}/me/playlists`, {
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

const setPlaylist = async (authToken, data) => {
  return http.post(`${baseUrl}/playlists`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

const updatePlaylist = async (authToken, id, data) => {
  return http.patch(`${baseUrl}/playlists/${id}`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

const deletePlaylist = async (authToken, id) => {
  return http.delete(`${baseUrl}/playlists/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

const playlistsApi = {
  getPlaylist,
  getPlaylists,
  getMyPlaylists,
  setPlaylist,
  updatePlaylist,
  deletePlaylist,
};

export default playlistsApi;
