import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import "./CharacterCard.css";
import {
  ArrowForwardIos,
  Favorite,
  FavoriteBorder,
  Man,
  Woman,
} from "@mui/icons-material";
import { toggleFavorite } from "../../redux/reducers/characterReducer";
import { useDispatch } from "react-redux";
import { getIdFromUrl } from "../../utils/characterUtils";
import { useNavigate } from "react-router-dom";
export default function CharacterCard({
  name,
  height,
  mass,
  gender,
  favorite,
  url,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const characterId = getIdFromUrl(url);
  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite({ characterId }));
  };
  const handleNavigate = () => {
    navigate("/people/" + characterId);
  };
  return (
    <Grid
      className={`character-card-container ${gender}`}
      onClick={handleNavigate}
      container
    >
      <Grid item xs={4}>
        <Grid className="gender-container">
          {gender == "male" ? <Man /> : gender == "n/a" ? "N/A" : <Woman />}
        </Grid>
      </Grid>
      <Grid item xs={6} className="card-content">
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
      <Grid item xs={2} className="card-content">
        <Box className="like-btn-container" onClick={handleToggleFavorite}>
          {" "}
          {favorite ? <Favorite className="favorite" /> : <FavoriteBorder />}
        </Box>

        <ArrowForwardIos className="arrow-forward" />
      </Grid>
      <Grid className="bar" container></Grid>
    </Grid>
  );
}
