import React from "react";
import "./HomePage.css";
import { Grid } from "@mui/material";
import Characters from "../characters/Characters";
import Filters from "../filters/Filters";

export default function HomePage() {
  return (
    <Grid container padding={"20px"}>
      <Grid md={3} item>
        <Filters />
      </Grid>
      <Grid md={8} sm={12} item>
        <Characters />
      </Grid>
    </Grid>
  );
}
