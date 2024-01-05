import { createSlice } from "@reduxjs/toolkit";
import { fetchCharacters } from "../actions/characterAction";

const initialState = {
  characters: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: false,
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = [...state.characters, ...action.payload.results];
        state.page = state.page + 1;
        state.hasMore = action.payload.next;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = characterSlice.actions;
export default characterSlice.reducer;
