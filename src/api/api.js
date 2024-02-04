import axios from "axios";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMoviesAndShows = async (endpoints) => {
  const response = await axios.get(
    `${TMDB_BASE_URL}/${endpoints}?api_key=${API_KEY}`,
  );
  return response.data;
};

export const searchMoviesAndShows = async ({ query, pageParam }) => {
  const res = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
    params: {
      api_key: API_KEY,
      query: query,
      page: pageParam,
    },
  });
  return res.data;
};

export const fetchExploreMedia = async ({ pageParam, mediaType }) => {
  console.log("page is", pageParam);
  console.log("mediaType is", mediaType);
  const response = await axios.get(`${TMDB_BASE_URL}/discover/${mediaType}`, {
    params: {
      api_key: API_KEY,
      page: pageParam,
    },
  });

  return response.data;
};
