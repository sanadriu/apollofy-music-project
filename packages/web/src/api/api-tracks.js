import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getTrack = async (trackId) => {
  return http.get(`${baseUrl}/tracks/${trackId}`);
}

// const getTracks = async (limitNum = 10, pageNum = 1, genreName = '') => {
//   return http.get(`${baseUrl}/tracks?limit=${limitNum}&page=${pageNum}&genre=${genreName}`);
// }

const getTracks = async (limitNum = 10, pageNum = 1, genreName = '') => {
  return http.get(`${baseUrl}/tracks`, {
    params: {
      limit: limitNum,
      page: pageNum,
      genre: genreName
    }
  });
}

const setTrack = async (authToken, track) => {
  return http.post(`${baseUrl}/tracks`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    data: track
  });
}

const updateTrack = async (authToken, track) => {
  return http.post(`${baseUrl}/tracks/${track.id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    data: track
  });
}

const deleteTrack = async (authToken, trackId) => {
  return http.post(`${baseUrl}/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    data: trackId
  });
}

const tracksApi = {
  getTrack,
  getTracks,
  setTrack,
  updateTrack,
  deleteTrack
};

export default tracksApi;
