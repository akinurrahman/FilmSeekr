import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "a20fa27b2de91d2caa7afb4d44ec34e0";

export const fetchTmdb = createApi({
  reducerPath: "TMDB",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    trendingMovies: builder.query({
      query: (endpoint) => `${endpoint}?api_key=${API_KEY}`,
    }),
  }),
});
export const { useTrendingMoviesQuery } = fetchTmdb;
