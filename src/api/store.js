import { configureStore } from "@reduxjs/toolkit";
import { fetchTmdb } from "./fetchTmdb";

const store = configureStore({
  reducer: {
    [fetchTmdb.reducerPath]: fetchTmdb.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchTmdb.middleware),
});

export default store;
