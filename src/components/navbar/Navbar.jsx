import React from "react";
import Search from "../search/Search";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FavoriteBorder } from "@mui/icons-material";
import { Box } from "@mui/material";
export default function Navbar() {
  return (
    <Box className="navbar-container">
      <Box>
        <img src={logo} alt="" />
      </Box>

      <Search />

      <Box className="favorites">
        <FavoriteBorder />
      </Box>
    </Box>
  );
}
