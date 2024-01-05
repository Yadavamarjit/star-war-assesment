import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import "./CharacterCard.css";
import { Man, Woman } from "@mui/icons-material";
export default function CharacterCard({ name, height, mass, gender }) {
  return (
    <Grid className={`character-card-container ${gender}`} container>
      <Grid item sx="5">
        <Grid className="gender-container">
          {gender == "male" ? <Man /> : gender == "n/a" ? "N/A" : <Woman />}
        </Grid>
      </Grid>
      <Grid item sx="5">
        <Typography>
          Name : <span>{name}</span>
        </Typography>
        <Typography>
          Height : <span>{height}</span>
        </Typography>
        <Typography>
          Mass : <span>{mass}</span>
        </Typography>
      </Grid>{" "}
      <Grid className="bar" item sx="1">
        <Divider orientation="vertical" />
      </Grid>
    </Grid>
  );
}
