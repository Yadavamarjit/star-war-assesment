export const getIdFromUrl = (url) => {
  let splitedUrl = url.split("/");
  return splitedUrl[splitedUrl.length - 2];
};

export const setFavoritePropertyForFetchedCharacters = (
  favorite,
  fetchedCharacters
) => {
  fetchedCharacters.forEach((character) => {
    const id = getIdFromUrl(character.url);
    character.favorite = !!favorite[id];
  });
};
