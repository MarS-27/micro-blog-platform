"use client";
import { createTheme, type ThemeOptions } from "@mui/material";

export const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#4a4a8a",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#eaeaea",
      paper: "#fafafa",
    },
    error: {
      main: "#ce2d2d",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});
