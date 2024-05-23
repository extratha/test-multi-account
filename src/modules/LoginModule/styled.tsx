import { styled, Container, TextField } from "@mui/material"

export const LoginContainer = styled(Container)(() => ({
    backgroundColor: "#1E6AF6",
    margin: "auto",
    borderRadius: "30px",
    maxWidth: 'unset',
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
    background: theme.palette.background.paper,
    borderRadius: "8px",
}));