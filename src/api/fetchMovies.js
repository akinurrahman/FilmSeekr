import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "a20fa27b2de91d2caa7afb4d44ec34e0";

export const fetchMovies = createApi({
  reducerPath: "TMDB",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: (mediaType) => `genre/${mediaType}/list?api_key=${API_KEY}`,
      transformResponse: (response) => response.genres,
    }),

    fetchTBDB: builder.query({
      query: (parameters) => `${parameters}?api_key=${API_KEY}`,
    }),
    getSearch: builder.query({
      query: (parameters) => `${parameters}&api_key=${API_KEY}`,
    }),
  }),
});
export const { useGetGenresQuery, useFetchTBDBQuery, useGetSearchQuery } = fetchMovies;
