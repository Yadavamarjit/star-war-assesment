import { Checkbox, Grid, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Filters.css";
import { filterCharacters } from "../../redux/reducers/characterReducer";

export default function Filters() {
  const { filters, selectedFilters, filteredCharacters } = useSelector(
    (state) => state.characters
  );
  const dispatch = useDispatch();
  console.log({ selectedFilters, filteredCharacters });
  const handleFilterChanged = (payload) => {
    dispatch(filterCharacters(payload));
  };

  return (
    <Grid className="filters-container">
      {Object.keys(filters).map((key) => {
        return (
          <Grid key={key}>
            <Typography variant="subtitle2">
              {key.toLocaleUpperCase().split("_")}
            </Typography>
            <Grid container className="checkbox-container">
              {Array.from(filters[key]).map((option) => (
                <Grid key={option}>
                  <Checkbox
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                    onChange={() => handleFilterChanged({ key, option })}
                  />
                  <Typography variant="caption">
                    {option.toLocaleUpperCase()}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
