import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getGenre = async (genreId) => {
  return http.get(`${baseUrl}/genres/${genreId}`);
}

const getGenres = async (limitNum = 10, pageNum = 1) => {
  return http.get(`${baseUrl}/genres?limit=${limitNum}&page=${pageNum}`);
}

const genresApi = {
  getGenre,
  getGenres,
};

export default genresApi;
