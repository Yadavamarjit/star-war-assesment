import React, { useState, useEffect } from "react";
import "./Search.css";
import { Search as SearchIcon } from "@mui/icons-material";
// assuming the file is in the same directory
import { useDispatch, useSelector } from "react-redux";
import { filterCharacters } from "../../redux/reducers/characterReducer";
import { useDebounce } from "../../hooks/useDebounce";

export default function Search() {
  const { loading } = useSelector((state) => state.characters);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    dispatch(filterCharacters({ key: "name", option: debouncedSearchTerm }));
  }, [debouncedSearchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="searchContainer">
      <input
        type="text"
        placeholder="Search characters"
        value={searchTerm}
        onChange={handleInputChange}
        disabled={loading}
      />
      <SearchIcon />
    </div>
  );
}
