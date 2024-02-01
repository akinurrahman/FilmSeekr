import axios from "axios";
const YOUTUBE_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMoviesAndShows = async (endpoints) => {
  const response = await axios.get(
    `${YOUTUBE_BASE_URL}${endpoints}?api_key=${API_KEY}`,
  );
  return response.data;
};
