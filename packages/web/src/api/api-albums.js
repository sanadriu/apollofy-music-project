import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getAlbum = async (albumId) => {
  return http.get(`${baseUrl}/albums/${albumId}`);
};

const getAlbums = async (limitNum = 10, pageNum = 1, userId) => {
  return http.get(`${baseUrl}/albums`, {
    params: {
      limit: limitNum,
      page: pageNum,
      user: userId,
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

const updateAlbum = async (authToken, album) => {
  return http.post(`${baseUrl}/albums/${album.id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: album,
  });
};

const deleteAlbum = async (authToken, albumId) => {
  return http.post(`${baseUrl}/albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: albumId,
  });
};

const albumsApi = {
  getAlbum,
  getAlbums,
  setAlbum,
  updateAlbum,
  deleteAlbum,
};

export default albumsApi;
