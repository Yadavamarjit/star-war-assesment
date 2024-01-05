import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CharacterCard from "../cards/CharacterCard";
import { fetchCharacters } from "../../redux/actions/characterAction";
import "./Characters.css";

export default function Characters() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const loading = useSelector((state) => state.characters.loading);
  const error = useSelector((state) => state.characters.error);

  const loadCharacters = () => {
    dispatch(fetchCharacters(1));
  };
  useEffect(() => {
    loadCharacters();
  }, []);
  return (
    <div className="characters-container">
      {characters.map((character, i) => (
        <CharacterCard {...character} key={i} />
      ))}
    </div>
  );
}
