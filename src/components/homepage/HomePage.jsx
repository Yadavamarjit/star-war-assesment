import React from "react";
import "./HomePage.css";
import { Grid } from "@mui/material";
import Characters from "../characters/Characters";
import Filters from "../filters/Filters";
import Navbar from "../navbar/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Grid container className="homepage-container">
        <Grid md={3} item>
          <Filters />
        </Grid>
        <Grid md={8} sm={12} item>
          <Characters />
        </Grid>
      </Grid>
    </>
  );
}
