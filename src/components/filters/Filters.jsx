import {
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Filters.css";
import { filterCharacters } from "../../redux/reducers/characterReducer";

export default function Filters() {
  const { filters, loading, page, selectedFilters } = useSelector(
    (state) => state.characters
  );
  const dispatch = useDispatch();
  const handleFilterChanged = (payload) => {
    dispatch(filterCharacters(payload));
  };

  const isOptionChecked = (key, option) => {
    if (selectedFilters[key]) {
      if (key == "sort") {
        return selectedFilters[key] === option;
      }
      const indx = selectedFilters[key].findIndex((opt) => opt === option);
      if (indx > -1) {
        return true;
      }
    }
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
                    value={option}
                    checked={isOptionChecked(key, option)} // Set checked based on selectedFilters
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
      <Grid>Sort</Grid>
      <RadioGroup
        onChange={(e) =>
          handleFilterChanged({
            key: "sort",
            option: e.target.value,
          })
        }
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="ascending"
          control={
            <Radio
              checked={isOptionChecked("sort", "ascending")}
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600],
                },
              }}
            />
          }
          label="A-Z"
        />
        <FormControlLabel
          value="descending"
          control={
            <Radio
              checked={isOptionChecked("sort", "descending")}
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600],
                },
              }}
            />
          }
          label="Z-A"
        />
      </RadioGroup>
    </Grid>
  );
}
