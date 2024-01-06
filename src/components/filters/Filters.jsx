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
import acending from "../../assets/acending.svg";
import decending from "../../assets/decending.svg";

import "./Filters.css";
import { filterCharacters } from "../../redux/reducers/characterReducer";

export default function Filters() {
  const { filters, loading } = useSelector((state) => state.characters);
  const dispatch = useDispatch();
  const handleFilterChanged = (payload) => {
    dispatch(filterCharacters(payload));
  };

  return (
    <>
      {!loading && (
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
      )}
    </>
  );
}
