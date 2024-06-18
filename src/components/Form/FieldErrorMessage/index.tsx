import { styled, Typography } from "@mui/material";

export const FieldErrorMessage = styled(Typography)(({ theme }) => ({
  lineHeight: "36px",
  color: theme.palette.error.light,
}));
