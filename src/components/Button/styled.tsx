import { Button, ButtonProps, styled } from "@mui/material";

export const SubmitButtonStyle = styled(Button)<ButtonProps>(({ theme, disabled }) => ({
  width: "100%",
  height: "52px",
  margin: "2em 0 0",
  backgroundColor: disabled ? theme.palette.grey[200] : theme.palette.primary.light,
  color: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    opacity: 0.9,
  },
}));
