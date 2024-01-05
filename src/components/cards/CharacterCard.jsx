import { Grid, Typography } from "@mui/material";
import React from "react";
import "./CharacterCard.css";
export default function CharacterCard({ name, height, mass, gender }) {
  return (
    <Grid className="character-card-container" container>
      <Grid item sx="8">
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
    </Grid>
  );
}
