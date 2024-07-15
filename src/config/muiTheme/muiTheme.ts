import { CommonColors, SurfaceGray, TypeText } from "@mui/material";
import { amber, blueGrey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { IBM_Plex_Sans_Thai } from "next/font/google";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

const colors = {
  surfaceGray: {
    lowest: "#FAFAFA",
  } as SurfaceGray,
  blue: {
    500: "#2196F3",
  },
  text: {
    disabled: "#B0BEC5",
    medium: "#607D8B",
    hight: "#212121",
    success: "#4CAF50",
  } as TypeText,
  common: {
    black: "#000000",
    white: "#FFFFFF",
  } as CommonColors,
};

const createMuiTheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: colors.blue[500],
      },
      surfaceGray: colors.surfaceGray,
      blueGrey,
      grey: {},
      amber: amber,
      text: colors.text,
      common: colors.common,
      background: {
        border: "#CFD8DC",
        borderLight: "#ECEFF1",
        grayLight: "#ECEFF1",
        gradient: "linear-gradient(94deg, #0059D6 0%, #028DF5 50%, #00CBDD 100%)",
      },
    },
    typography: {
      fontFamily: ibmPlexSansThai.style.fontFamily,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      headerExtraLargeBold: {
        fontSize: "36px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      headerSemiBold: {
        fontSize: "24px",
        fontWeight: 600,
        lineHeight: "30px",
      },
      headerBold: {
        fontSize: "24px",
        fontWeight: 700,
        lineHeight: "30px",
      },
      titleLargeBold: {
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "28px",
      },
      titleSemibold: {
        fontSize: "18px",
        fontWeight: 600,
        lineHeight: "24px",
      },
      titleBold: {
        fontSize: "18px",
        fontWeight: 700,
        lineHeight: "24px",
      },
      bodyMedium: {
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      bodyBold: {
        fontSize: "16px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
      bodySmall: {
        fontSize: "14px",
        lineHeight: 1.5,
      },
      bodySmallMedium: {
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: 1.5,
      },
      labelExtraSmall: {
        fontSize: "12px",
        lineHeight: 1.5,
      },
      labelExtraSmallMedium: {
        fontSize: "12px",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      labelExtraSmallBold: {
        fontSize: "12px",
        fontWeight: 700,
        lineHeight: 1.5,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "html, body": {
            width: "100%",
            height: "100%",
          },
          body: {
            display: "flex",
            flexDirection: "column",
            color: colors.text.hight,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            color: "unset",
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            headerExtraLargeBold: "h1",
            headerSemiBold: "h3",
            headerBold: "h3",
            titleLargeBold: "p",
            titleSemibold: "p",
            titleBold: "p",
            bodyMedium: "p",
            bodyBold: "p",
            bodySmall: "p",
            bodySmallMedium: "p",
            labelExtraSmall: "span",
            labelExtraSmallMedium: "span",
            labelExtraSmallBold: "span",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
          input: {
            padding: "12px",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            padding: "4px 8px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "12px",
            fontWeight: 700,
            lineHeight: 1.5,
          },
          contained: {
            "&.Mui-disabled": {
              backgroundColor: colors.surfaceGray.lowest,
              colors: colors.text.disabled,
            },
          },
          containedPrimary: {
            backgroundColor: colors.blue[500],
          },
        },
      },
    },
  });
};

export default createMuiTheme;
