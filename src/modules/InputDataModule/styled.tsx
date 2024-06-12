import { CUSTOM_COLORS } from "@/config/config-mui/theme/colors";
import { Button, Stack, styled } from "@mui/material";

export const CommonButton = styled(Button)(({ theme }) => ({
  padding: 10,
  height: 40,
  background: theme.palette.background.paper,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.grey[500]}`,
  width: "fit-content",
  color: CUSTOM_COLORS.buttonText,
}));

export const ContentContainerWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "20px",
  maxWidth: "1080px",
  width: "100%",
  height: "100%",
  padding: "2rem",
  margin: "auto",
  overflowY: "auto",
}));
