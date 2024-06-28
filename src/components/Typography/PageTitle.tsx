import { typography } from "@/config/config-mui/theme/typography";
import { Typography, styled } from "@mui/material";

const PageTitle = styled(Typography)(() => [
  typography.displayMediumSemiBold,
  {
    background: "linear-gradient(90deg, #023781 0%, #028DF5 50%, #01EAFF 100%)",
    backgroundClip: "text",
    textFillColor: "transparent",
    lineHeight: "1.5",
  },
]);

export default PageTitle;
