import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getAlbum = (albumId, { extend }) => {
  return http.get(`${baseUrl}/albums/${albumId}`, {
    params: { extend },
  });
};

const getAlbums = ({ page, limit, sort, order, genre, track, userId }) => {
  return http.get(`${baseUrl}/albums`, {
    params: { page, limit, sort, order, genre, track, user: userId },
  });
};

const getUserAlbums = (authToken, { page, limit, sort, order, extend }) => {
  return http.get(`${baseUrl}/me/albums`, {
    headers: { Authorization: `Bearer ${authToken}` },
    params: { page, sort, order, limit, extend },
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
