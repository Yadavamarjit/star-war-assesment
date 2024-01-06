import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { fetchCharacters } from "../actions/characterAction";
import {
  getFilteredCharacters,
  getIdFromUrl,
  getOptionsAndFavorites,
} from "../../utils/genralUtils";

const initialState = {
  characters: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: false,
  favorite: {},
  filters: {},
  selectedFilters: {},
  filteredCharacters: [],
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
        delete state.favorite[characterId];
      } else {
        state.favorite[characterId] = true;
      }
      state.filteredCharacters = getFilteredCharacters(
        state.characters,
        state.selectedFilters
      );
    },
    filterCharacters: (state, action) => {
      const { selectedFilters } = state;
      const { key, option } = action.payload;
      console.log({ key, option });
      if (selectedFilters[key]) {
        if (key !== "name" && key !== "sort" && key !== "favorite") {
          const index = selectedFilters[key].findIndex(
            (filter) => filter === option
          );
          if (index > -1) {
            selectedFilters[key] = selectedFilters[key].filter(
              (filter) => filter !== option
            );
            if (selectedFilters[key].length == 0) delete selectedFilters[key];
          } else {
            selectedFilters[key].push(option);
          }
        } else if (key == "name" || key == "sort" || key == "favorite") {
          selectedFilters[key] = option;

          if (
            key == "favorite" &&
            (option === false || selectedFilters[key]?.length) == 0
          )
            delete selectedFilters[key];
        }
      } else {
        if (key == "name" || key == "sort" || key == "favorite") {
          (option?.length || option) && (selectedFilters[key] = option);
        } else selectedFilters[key] = [option];
      }
      state.filteredCharacters = getFilteredCharacters(
        state.characters,
        selectedFilters
      );
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

        // generating options for filter and and retirving favorite characters
        getOptionsAndFavorites(state, fetchedCharacters);

        state.loading = false;
        state.characters = [...state.characters, ...fetchedCharacters];
        state.page = state.page + 1;
        state.hasMore = action.payload.next;

        // filttering characters when page is changed

        state.filteredCharacters = getFilteredCharacters(
          state.characters,
          state.selectedFilters
        );
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
  whitelist: ["favorite"], //Persisting favorite property
};

export const persistedCharacterReducer = persistReducer(
  persistConfig,
  characterSlice.reducer
);

export const { toggleFavorite, filterCharacters } = characterSlice.actions;
export default characterSlice.reducer;
