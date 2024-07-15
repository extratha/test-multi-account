"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

import createMuiTheme from "./muiTheme";
import ThemeRegistry from "./ThemeRegistry";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeRegistry>
      <MuiThemeProvider theme={createMuiTheme()}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeRegistry>
  );
};

export default ThemeProvider;
