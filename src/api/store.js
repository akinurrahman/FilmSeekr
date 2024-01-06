import { configureStore } from "@reduxjs/toolkit";
import { fetchMovies } from "./fetchMovies";

const store = configureStore({
  reducer: {
    [fetchMovies.reducerPath]: fetchMovies.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchMovies.middleware),
});

export default store;
