import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "./slices/genresSlice";

const store = configureStore({
  reducer: {
    genres: genresReducer,
  },
});

export default store;
