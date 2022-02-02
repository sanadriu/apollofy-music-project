import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getTrack = async (trackId) => {
  return http.get(`${baseUrl}/tracks/${trackId}`);
}

const getTracks = async (pageNum = 10) => {
  return http.get(`${baseUrl}/tracks?_limit=10&_page=${pageNum}`);
}

const setTrack = async (track) => {
  return http.post(`${baseUrl}/tracks`, track);
}

const tracksApi = {
  getTrack,
  getTracks,
  setTrack,
};

export default tracksApi;
