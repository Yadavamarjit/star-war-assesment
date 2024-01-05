import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CharacterCard from "../cards/CharacterCard";
import { fetchCharacters } from "../../redux/actions/characterAction";
import "./Characters.css";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Characters() {
  const dispatch = useDispatch();
  const { characters, loading, error, page, hasMore } = useSelector(
    (state) => state.characters
  );
  console.log(characters);
  const loadCharacters = () => {
    dispatch(fetchCharacters(page + 1));
  };

  useEffect(() => {
    loadCharacters();
  }, []);
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
