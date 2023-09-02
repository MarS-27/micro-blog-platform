"use client";
import { theme } from "@/utils/theme";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { FC, ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
