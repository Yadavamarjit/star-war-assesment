import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CharacterCard from "../cards/CharacterCard";
import { fetchCharacters } from "../../redux/actions/characterAction";
import "./Characters.css";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Characters() {
  const dispatch = useDispatch();
  const {
    characters: allCharacters,
    loading,
    error,
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
    <InfiniteScroll
      dataLength={characters.length}
      next={loadCharacters}
      hasMore={hasMore}
      loader={<h4>Loading ... </h4>}
    >
      {" "}
      <div className="characters-container">
        {characters.map((character, i) => (
          <CharacterCard {...character} key={i} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
