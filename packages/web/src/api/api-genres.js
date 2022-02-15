import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getGenre = async (genreId) => {
  return http.get(`${baseUrl}/genres/${genreId}`);
};

const getGenres = async () => {
  return http.get(`${baseUrl}/genres`);
};

const genresApi = {
  getGenres,
  getGenre,
};

export default genresApi;
