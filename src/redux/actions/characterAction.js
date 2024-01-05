import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetch } from "../../utils/fetch";

// using createAsyncThunk() to fetch charaters and manage state asynchronously
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
