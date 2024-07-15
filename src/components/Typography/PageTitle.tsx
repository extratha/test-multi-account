import { Typography, styled } from "@mui/material";

const PageTitle = styled(Typography)(({ theme }) => [
  { ...theme.typography.headerExtraLargeBold },
  {
    background: theme.palette.background.gradient,
    backgroundClip: "text",
    textFillColor: "transparent",
    lineHeight: "1.5",
  },
]);

export default PageTitle;
