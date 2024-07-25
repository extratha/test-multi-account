import { styled, TextField } from "@mui/material";

export const CustomTextField = styled(TextField)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "8px",
}));
