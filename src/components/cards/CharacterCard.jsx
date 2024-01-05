import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import "./CharacterCard.css";
import {
  ArrowForwardIos,
  Favorite,
  FavoriteBorder,
  Man,
  Woman,
} from "@mui/icons-material";
export default function CharacterCard({
  name,
  height,
  mass,
  gender,
  favorite,
}) {
  return (
    <Grid className={`character-card-container ${gender}`} container>
      <Grid item xs="4">
        <Grid className="gender-container">
          {gender == "male" ? <Man /> : gender == "n/a" ? "N/A" : <Woman />}
        </Grid>
      </Grid>
      <Grid item xs="6" className="card-content">
        <Typography>
          Name : <span>{name}</span>
        </Typography>
        <Typography>
          Height : <span>{height}</span>
        </Typography>
        <Typography>
          Mass : <span>{mass}</span>
        </Typography>
      </Grid>
      <Grid item xs="2" className="card-content">
        <Box>{favorite ? <Favorite /> : <FavoriteBorder />}</Box>
        <Box>
          <ArrowForwardIos />
        </Box>
      </Grid>
      <Grid className="bar" container></Grid>
    </Grid>
  );
}
