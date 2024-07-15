import { Stack, Typography, styled } from "@mui/material";

export const ContentContainerWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "24px",
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

export const TypographyPageHeadline = styled(Typography)(({ theme }) => ({
  width: "fit-content",
  background: theme.palette.background.gradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
}));
