import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Grid, Paper } from "@mui/material";
import { fetchFilmData, findCharacter } from "../../utils/characterDetail";
import "./CharacterDetail.css";
import Navbar from "../navbar/Navbar";
import Loader from "../loader/Loader";

export default function CharacterDetail() {
  const [character, setCharacter] = useState({});
  const [films, setFilms] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    findCharacter(id)
      .then((res) => {
        setCharacter(res);
        const filmUrls = res.films;
        const filmPromises = filmUrls.map((filmUrl) => fetchFilmData(filmUrl));
        Promise.all(filmPromises)
          .then((filmsData) => {
            setFilms(filmsData);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const excludeKeys = [
    "url",
    "edited",
    "created",
    "starships",
    "species",
    "homeworld",
    "films",
    "vehicles",
  ];

  const filteredKeys = Object.keys(character).filter(
    (key) => !excludeKeys.includes(key)
  );

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Grid className="character-details" elevation={3}>
          <Typography variant="h4" gutterBottom>
            Character Details
          </Typography>
          <Grid container spacing={2}>
            {filteredKeys.map((key) => (
              <Grid item xs={6} key={key}>
                <Typography>
                  <strong>
                    {capitalizeFirstLetter(key.replace(/_/g, " "))}:
                  </strong>{" "}
                  {character[key]}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {films && (
            <div className="films-details">
              <Typography variant="h4">Films Data</Typography>
              <Grid container spacing={2}>
                {films.map((film, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>{film.title}</strong> - {film.director},{" "}
                      {film.release_date}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Opening Crawl:</strong> {film.opening_crawl}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </Grid>
      )}
    </>
  );
}
