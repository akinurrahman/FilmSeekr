import { createSlice } from "@reduxjs/toolkit";

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    allGenres: [],
    movieGenres: [],
    tvGenres: [],
  },
  reducers: {
    setAllGenres: (state, action) => {
      state.allGenres = action.payload;
    },
    setMovieGenres: (state, action) => {
      state.movieGenres = action.payload;
    },
    setTvGenres: (state, action) => {
      state.tvGenres = action.payload;
    },
  },
});

export default genresSlice.reducer;
export const { setAllGenres, setMovieGenres, setTvGenres } =
  genresSlice.actions;
