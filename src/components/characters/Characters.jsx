import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CharacterCard from "../cards/CharacterCard";
import { fetchCharacters } from "../../redux/actions/characterAction";
import "./Characters.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader/Loader";

export default function Characters() {
  const dispatch = useDispatch();
  const {
    characters: allCharacters,
    loading,
    page,
    hasMore,
    filteredCharacters,
    selectedFilters,
  } = useSelector((state) => state.characters);

  const [characters, setCharacters] = useState(allCharacters);

  useEffect(() => {
    if (Object.keys(selectedFilters).length > 0) {
      setCharacters(filteredCharacters);
    } else setCharacters(allCharacters);
  }, [allCharacters, filteredCharacters]);

  const loadCharacters = () => {
    dispatch(fetchCharacters(page + 1));
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {}, []);
  return (
    <>
      {" "}
      {loading && page <= 0 ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={characters.length}
          next={loadCharacters}
          hasMore={hasMore}
          loader={loading ? <center>Fetching more characters ... </center> : ""}
        >
          {" "}
          <div className="characters-container">
            {characters.map((character, i) => (
              <CharacterCard {...character} key={i} />
            ))}
            {!loading && characters.length == 0 && (
              <h3 className="no-characters">No Character Found</h3>
            )}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}
