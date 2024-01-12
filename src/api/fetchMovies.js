import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "a20fa27b2de91d2caa7afb4d44ec34e0";

export const fetchMovies = createApi({
  reducerPath: "TMDB",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    upcomming: builder.query({
      query: (mediaType) => `${mediaType}/popular?api_key=${API_KEY}`,
    }),

    trending: builder.query({
      query: (timeWindow) => `trending/all/${timeWindow}?api_key=${API_KEY}`,
    }),

    getMovieGenres: builder.query({
      query: () => `genre/movie/list?api_key=${API_KEY}`,
      transformResponse: (response) => response.genres,
    }),

    getTVGenres: builder.query({
      query: () => `genre/tv/list?api_key=${API_KEY}`,
      transformResponse: (response) => response.genres,
    }),
    // other endpoints
  }),
});
export const {
  useUpcommingQuery,
  useTrendingQuery,
  useGetMovieGenresQuery,
  useGetTVGenresQuery,
} = fetchMovies;
