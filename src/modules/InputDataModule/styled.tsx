import { CUSTOM_COLORS, NEUTRAL } from "@/config/config-mui/theme/colors";
import { Button, Grid, Stack, styled, Typography } from "@mui/material";

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

const inputDataGroupBorderRadius = 8;
export const InputDataGroupContainer = styled(Stack)(({ theme }) => ({
  borderRadius: inputDataGroupBorderRadius,
  border: `1px solid ${theme.palette.grey[400]}`,
  margin: "2rem 0",
}));

export const InputDataGroupHeader = styled(Stack)(() => ({
  background: NEUTRAL[97],
  padding: "1rem",
  borderRadius: `${inputDataGroupBorderRadius}px ${inputDataGroupBorderRadius}px 0px 0px`,
}));

export const InputDataGroupContent = styled(Stack)(() => ({
  padding: "1rem",
}));

export const InputDataFieldWrapper = styled(Grid)(() => ({
  padding: "1rem",
}));

export const TypoUnit = styled(Typography)(({ theme }) => ({
  wordWrap: "break-word",
  color: theme.palette.grey[600],
  margin: "auto 0",
}));
