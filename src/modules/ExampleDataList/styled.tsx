import { Button, styled } from "@mui/material";

export const ButtonInterpretDataStyled = styled(Button)(({ theme, disabled }) => ({
  height: "40px",
  borderRadius: "10px",
  background: disabled ? theme.palette.surfaceGray.lowest : theme.palette.background.gradient,
}));
