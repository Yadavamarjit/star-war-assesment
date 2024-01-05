import React from "react";
import Search from "../search/Search";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FavoriteBorder } from "@mui/icons-material";
export default function Navbar() {
  return (
    <div className="navbar-container" container>
      <img src={logo} alt="" />
      <div className="search-container">
        {" "}
        <Search />
      </div>
      <div className="favorites">
        <FavoriteBorder />
      </div>
    </div>
  );
}
