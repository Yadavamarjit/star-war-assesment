import { configureStore } from "@reduxjs/toolkit";
import characterReducer, {
  persistedCharacterReducer,
} from "../reducers/characterReducer";
import persistStore from "redux-persist/es/persistStore";
import { enableMapSet } from "immer";

enableMapSet();
export const store = configureStore({
  reducer: {
    characters: persistedCharacterReducer,
  },
});

export const persistor = persistStore(store);
