import { configureStore } from "@reduxjs/toolkit";
import { fetchMovies } from "./fetchMovies";
import genresReducer from "./slices/genresSlice";

const store = configureStore({
  reducer: {
    genres: genresReducer,
    [fetchMovies.reducerPath]: fetchMovies.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchMovies.middleware),
});

export default store;
