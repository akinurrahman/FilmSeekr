import { createSlice } from "@reduxjs/toolkit";

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    allGenres: [],
  },
  reducers: {
    setAllGenres: (state, action) => {
      state.allGenres = action.payload;
    },
  },
});

export default genresSlice.reducer;
export const { setAllGenres } = genresSlice.actions;
