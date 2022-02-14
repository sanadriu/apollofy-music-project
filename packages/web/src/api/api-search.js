import http from "../services/httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getSearch = async (query) => {
  return http.get(`${baseUrl}/search`, {
    params: {
      q: query,
    },
  });
};

const searchApi = {
  getSearch,
};

export default searchApi;
