import { fetch } from "./fetch";

export const findCharacter = async (id) => await fetch("GET", `/people/${id}`);

export const fetchFilmData = async (url) => {
  try {
    const response = await fetch("GET", "", {}, {}, {}, url);
    return response;
  } catch (err) {
    throw new Error(`Failed to fetch`, url);
  }
};
