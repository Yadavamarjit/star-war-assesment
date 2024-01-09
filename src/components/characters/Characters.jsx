import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CharacterCard from "../cards/CharacterCard";
import { fetchCharacters } from "../../redux/actions/characterAction";
import "./Characters.css";
import Loader from "../loader/Loader";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

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
  const containerRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState("vertical");

  useEffect(() => {
    if (Object.keys(selectedFilters).length > 0) {
      setCharacters(filteredCharacters);
    } else {
      setCharacters(allCharacters);
    }
  }, [allCharacters, filteredCharacters, selectedFilters]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      // if (loading) return;
      if (container) {
        const isEndReached =
          scrollDirection === "horizontal"
            ? container.scrollLeft + container.clientWidth >=
              container.scrollWidth
            : window.innerHeight + window.scrollY >=
              document.documentElement.scrollHeight;

        if (hasMore && !loading && isEndReached) {
          dispatch(fetchCharacters(page + 1));
        }
      }
    };

    const scrollableRef =
      scrollDirection === "horizontal" ? containerRef.current : window;
    scrollableRef.addEventListener("scroll", handleScroll);

    return () => {
      scrollableRef.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, page, hasMore, loading, scrollDirection]);

  useEffect(() => {
    if (page === 0) {
      dispatch(fetchCharacters(page + 1));
    }
  }, [page]);

  const handleChangeScrollDirection = (e) => {
    setScrollDirection(e.target.value);
  };

  return (
    <>
      {loading && page <= 0 ? (
        <Loader />
      ) : (
        <>
          <RadioGroup
            row
            aria-label="scroll-direction"
            name="scroll-direction"
            value={scrollDirection}
            onChange={handleChangeScrollDirection}
          >
            <div>
              <FormControlLabel
                value="vertical"
                control={<Radio />}
                label="Vertical"
              />
            </div>{" "}
            <div>
              <FormControlLabel
                value="horizontal"
                control={<Radio />}
                label="Horizontal"
              />
            </div>
          </RadioGroup>
          <div
            className={`characters-container ${
              scrollDirection == "horizontal" ? "horizontal" : "vertical"
            }`}
            ref={containerRef}
          >
            {characters.map((character, i) => (
              <CharacterCard {...character} key={i} />
            ))}
            {!loading && characters.length === 0 && (
              <h3 className="no-characters">No Character Found</h3>
            )}
          </div>
        </>
      )}
    </>
  );
}
