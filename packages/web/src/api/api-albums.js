import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getAlbum = (albumId, params) => {
  return http.get(`${baseUrl}/albums/${albumId}`, { params });
};

const getAlbums = (params) => {
  return http.get(`${baseUrl}/albums`, { params });
};

const getUserAlbums = (authToken, params) => {
  return http.get(`${baseUrl}/me/albums`, {
    headers: { Authorization: `Bearer ${authToken}` },
    params,
  });
};

const createAlbum = (authToken, album) => {
  return http.post(`${baseUrl}/albums`, album, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const updateAlbum = (authToken, album) => {
  return http.patch(`${baseUrl}/albums/${album.id}`, album, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const deleteAlbum = (authToken, albumId) => {
  return http.delete(`${baseUrl}/albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

const likeAlbum = (authToken, albumId) => {
  return http.patch(`${baseUrl}/albums/${albumId}/like`, undefined, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

const albumsApi = {
  getAlbum,
  getAlbums,
  getUserAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  likeAlbum,
};

export default albumsApi;
