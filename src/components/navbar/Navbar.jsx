import React, { useState } from "react";
import Search from "../search/Search";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Favorite, FavoriteBorder, Menu } from "@mui/icons-material";
import { Box, Button, Drawer, Grid, Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { filterCharacters } from "../../redux/reducers/characterReducer";
import { Link, useNavigate } from "react-router-dom";
import Filters from "../filters/Filters";
export default function Navbar() {
  const { selectedFilters } = useSelector((state) => state.characters);
  const [showFilters, setShowFilters] = useState(false);

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

  const toggleFilters = () => {
    setShowFilters(!showFilters); // Toggle the state value for showing filters
  };
  return (
    <Box className="navbar-container">
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>

      <Box className="navbar-search">
        <Search />
      </Box>

      {/* <Box className="favorites"> */}
      <Button
        className="fav-button"
        variant="text"
        onClick={handleviewFavorite}
      >
        {selectedFilters["favorite"] ? "View All " : "View Favorites"}
      </Button>
      <Menu className="toggle-menu" onClick={toggleFilters} />
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
          },
        }}
        anchor="right"
        open={showFilters}
        onClose={() => setShowFilters(false)}
      >
        <Grid className="filters-container-mobile" md={3} item>
          <Filters />
        </Grid>
      </Drawer>
    </Box>
  );
}
