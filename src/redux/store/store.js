import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "../reducers/characterReducer";

const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});

export default store;
