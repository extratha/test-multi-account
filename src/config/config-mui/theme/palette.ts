import { PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CUSTOM_COLORS, ERROR, NEUTRAL, PRIMARY, SECONDARY, STATUS_NORMAL, TERTIARY, WARNING } from "./colors";

const getDesignTokens = (mode: PaletteMode) => {
  const lightMode = {
    primary: {
      main: PRIMARY[50],
      light: PRIMARY[98],
    },
    secondary: {
      main: SECONDARY[50],
    },
    tertiary: {
      main: TERTIARY[50],
    },
    error: {
      main: ERROR[50],
    },
    success: {
      main: TERTIARY[50],
      light: STATUS_NORMAL[1],
    },
    warning: {
      main: WARNING[50],
    },
    background: {
      paper: NEUTRAL[100],
      default: NEUTRAL[99],
      neutral: NEUTRAL[50],
    },
    grey: {
      ...grey,
      [300]: CUSTOM_COLORS.lightSteelgray,
    },
    action: {
      active: CUSTOM_COLORS.iconActive,
    },
  };
  const darkMode = {
    primary: {
      main: PRIMARY[80],
      contrastText: NEUTRAL[95],
      light: PRIMARY[98],
    },
    secondary: {
      main: SECONDARY[80],
      contrastText: NEUTRAL[95],
    },
    tertiary: {
      main: TERTIARY[80],
    },
    error: {
      main: ERROR[80],
    },
    success: {
      main: TERTIARY[80],
      light: STATUS_NORMAL[1],
    },
    warning: {
      main: WARNING[80],
    },
    text: {
      primary: NEUTRAL[100],
      secondary: NEUTRAL[90],
      disabled: "rgba(240, 241, 243, 0.38)",
    },
    background: {
      paper: NEUTRAL[6],
      default: NEUTRAL[6],
      neutral: NEUTRAL[100],
    },
    action: {
      disabled: "rgba(240, 241, 243, 0.38)",
      hoverOpacity: 0.08,
      disabledOpacity: 0,
      active: CUSTOM_COLORS.iconActive,
    },
  };
  const colorMode = mode === "light" ? lightMode : darkMode;
  return {
    palette: {
      mode,
      ...colorMode,
    },
  };
};

export default getDesignTokens;
