import { Stack, Typography, styled } from "@mui/material";

export const ContentContainerWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "1rem",
  borderRadius: "20px",
  height: "100%",
  overflowY: "auto",
}));

export const ContentContainer = styled(Stack)({
  height: "100%",
  maxHeight: "100vh",
  width: "100%",
  padding: "1rem",
});

export const TypographyPageHeadline = styled(Typography)(() => ({
  width: "fit-content",
  background: "linear-gradient(90deg, #023781 0%, #028DF5 50%, #01EAFF 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
}));
