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
        if (filterKey !== "name" && filterKey !== "sort") {
          return (
            filterValues.length === 0 ||
            filterValues.includes(character[filterKey])
          );
        }
        return true;
      }
    );
  });

  if (selectedFilters["name"]) {
    const searchTextLowerCase = selectedFilters["name"].toLowerCase();
    filteredCharacters = filteredCharacters.filter((character) =>
      character.name.toLowerCase().includes(searchTextLowerCase)
    );
  }

  if (selectedFilters["sort"]) {
    console.log("key", selectedFilters["sort"]);
    const sortDirection = selectedFilters["sort"];
    if (sortDirection === "ascending") {
      filteredCharacters.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortDirection === "descending") {
      filteredCharacters.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  return filteredCharacters;
};
