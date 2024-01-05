import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetch } from "../../utils/fetch";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (page) => {
    try {
      const response = await fetch("get", `/people/?page=${page}`);
      return response;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
