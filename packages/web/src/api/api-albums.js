import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getAlbum = async (albumId) => {
  return http.get(`${baseUrl}/albums/${albumId}`);
};

const getAlbums = async (limitNum = 10, pageNum = 1) => {
  return http.get(`${baseUrl}/albums?limit=${limitNum}&page=${pageNum}`);
};

const getMyAlbums = async (authToken, params = {}) => {
  const { page = 1, sort = "created_at", order = "asc", limit = 10, extend = false } = params;

  return http.get(`${baseUrl}/me/albums`, {
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

const setAlbum = async (authToken, album) => {
  return http.post(`${baseUrl}/albums`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: album,
  });
};

const updateAlbum = async (authToken, id, album) => {
  return http.patch(`${baseUrl}/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: album,
  });
};

const deleteAlbum = async (authToken, albumId) => {
  return http.delete(`${baseUrl}/albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

const albumsApi = {
  getAlbum,
  getAlbums,
  getMyAlbums,
  setAlbum,
  updateAlbum,
  deleteAlbum,
};

export default albumsApi;
