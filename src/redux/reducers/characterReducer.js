import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { fetchCharacters } from "../actions/characterAction";
import {
  getIdFromUrl,
  setFavoritePropertyForFetchedCharacters,
} from "../../utils/genralUtils";

const initialState = {
  characters: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: false,
  favorite: {},
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const { characterId } = action.payload;
      const updatedCharacters = state.characters.map((character) => {
        return getIdFromUrl(character.url) == characterId
          ? { ...character, favorite: !character.favorite }
          : character;
      });

      state.characters = updatedCharacters;

      if (state.favorite[characterId]) {
        delete state.favorite[id];
      } else {
        state.favorite[characterId] = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        const fetchedCharacters = action.payload.results;

        setFavoritePropertyForFetchedCharacters(
          state.favorite,
          fetchedCharacters
        );

        state.loading = false;
        state.characters = [...state.characters, ...fetchedCharacters];
        state.page = state.page + 1;
        state.hasMore = action.payload.next;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const persistConfig = {
  key: "characters",
  storage,
  whitelist: ["favorite"], // Only persist the 'favorite' property
};

export const persistedCharacterReducer = persistReducer(
  persistConfig,
  characterSlice.reducer
);

export const { toggleFavorite } = characterSlice.actions;
export default characterSlice.reducer;
