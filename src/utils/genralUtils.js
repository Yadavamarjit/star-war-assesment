export const getIdFromUrl = (url) => {
  let splitedUrl = url.split("/");
  return splitedUrl[splitedUrl.length - 2];
};

export const getOptionsAndFavorites = (state, fetchedCharacters) => {
  const { favorite, filters } = state;
  const options = {
    hair_color: new Set(filters.hair_color),
    skin_color: new Set(filters.skin_color),
    eye_color: new Set(filters.eye_color),
    gender: new Set(filters.gender),
  };

  fetchedCharacters.forEach((character) => {
    const id = getIdFromUrl(character.url);
    character.favorite = !!favorite[id];

    const { hair_color, skin_color, eye_color, gender } = character;

    hair_color && options.hair_color.add(hair_color);
    skin_color && options.skin_color.add(skin_color);
    eye_color && options.eye_color.add(eye_color);
    gender && options.gender.add(gender);
  });
  state.filters = { ...options };
};

export const getFilteredCharacters = (characters, selectedFilters) => {
  let filteredCharacters = characters.filter((character) => {
    return Object.entries(selectedFilters).every(
      ([filterKey, filterValues]) => {
        if (filterKey !== "name") {
          return (
            filterValues.length === 0 ||
            filterValues.includes(character[filterKey])
          );
        }
        return true; // Allow all characters initially for the name filter
      }
    );
  });

  if (selectedFilters["name"]) {
    const searchTextLowerCase = selectedFilters["name"].toLowerCase();
    filteredCharacters = filteredCharacters.filter((character) =>
      character.name.toLowerCase().includes(searchTextLowerCase)
    );
  }

  return filteredCharacters;
};
