import React from "react";
import "./HomePage.css";
import { Grid } from "@mui/material";
import Characters from "../characters/Characters";
import Filters from "../filters/Filters";
import Navbar from "../navbar/Navbar";
import Search from "../search/Search";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { page } = useSelector((state) => state.characters);
  return (
    <>
      <Navbar />
      <Grid className="mobile-search-bar">
        <Search className="sdf" />
      </Grid>
      <Grid container className="homepage-container">
        {/* preventing reloading of filters when charaacters are being fetched */}
        {page > 0 && (
          <Grid className="filters-container-lg" md={3} item>
            <Filters />
          </Grid>
        )}
        <Grid md={8} sm={12} item>
          <Characters />
        </Grid>
      </Grid>
    </>
  );
}
