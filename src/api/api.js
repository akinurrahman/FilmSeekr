import axios from "axios";
const YOUTUBE_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "a20fa27b2de91d2caa7afb4d44ec34e0";

export const fetchMoviesAndShows = async (endpoints) => {
  const response = await axios.get(
    `${YOUTUBE_BASE_URL}${endpoints}?api_key=${API_KEY}`,
  );
  return response.data;
};
