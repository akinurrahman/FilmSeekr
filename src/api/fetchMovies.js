import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "a20fa27b2de91d2caa7afb4d44ec34e0";

export const fetchMovies = createApi({
  reducerPath: "TMDB",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    trending: builder.query({
      query: (timeWindow) => `trending/all/${timeWindow}?api_key=${API_KEY}`,
    }),

    getGenres: builder.query({
      query: (mediaType) => `genre/${mediaType}/list?api_key=${API_KEY}`,
      transformResponse: (response) => response.genres,
    }),

    getPopular: builder.query({
      query: (mediaType) => `${mediaType}/popular?api_key=${API_KEY}`,
    }),
    
    getTopRated: builder.query({
      query: (mediaType) => `${mediaType}/top_rated?api_key=${API_KEY}`,
    }),

  }),
});
export const {
  useTrendingQuery,
  useGetGenresQuery,
  useGetPopularQuery,
  useGetTopRatedQuery,
} = fetchMovies;
