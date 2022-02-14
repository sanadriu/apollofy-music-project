import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getGenres = async (limitNum = 10, pageNum = 1) => {
  return http.get(`${baseUrl}/genres?limit=${limitNum}&page=${pageNum}`);
};

const getSingleGenre = async (id) => {
  return http.get(`${baseUrl}/genres/${id}`);
};

const genresApi = {
  getGenres,
  getSingleGenre,
};

export default genresApi;
