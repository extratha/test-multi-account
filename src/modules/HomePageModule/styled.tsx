import { styled, Container, TextField } from "@mui/material"

export const CustomContainer = styled(Container)(({theme}) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '1rem',
  borderRadius: '20px',
  height:'100%'
}));
