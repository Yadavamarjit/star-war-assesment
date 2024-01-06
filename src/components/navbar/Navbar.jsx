import React, { useState } from "react";
import Search from "../search/Search";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { filterCharacters } from "../../redux/reducers/characterReducer";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { selectedFilters } = useSelector((state) => state.characters);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleviewFavorite = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    dispatch(
      filterCharacters({
        key: "favorite",
        option: selectedFilters["favorite"] ? false : true,
      })
    );
  };

  return (
    <Box className="navbar-container">
      <Box>
        <img src={logo} alt="" />
      </Box>

      <Search />

      {/* <Box className="favorites"> */}
      <Button
        className="fav-button"
        variant="text"
        onClick={handleviewFavorite}
      >
        {selectedFilters["favorite"] ? (
          <>View All</>
        ) : (
          <>
            View <Favorite />
          </>
        )}
      </Button>
    </Box>
  );
}
