import { CircularProgress } from "@mui/material";
import React from "react";
import "./Loader.css";
export default function Loader() {
  return (
    <div className="custom-loader">
      <CircularProgress />
    </div>
  );
}
