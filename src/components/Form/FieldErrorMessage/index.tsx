import { styled, Typography } from "@mui/material";

export const FieldErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  lineHeight: 2,
  color: theme.palette.error.light,
}));
