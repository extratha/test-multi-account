import { styled, Stack } from "@mui/material"

export const CustomContainer = styled(Stack)(({theme}) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '1rem',
  borderRadius: '20px',
  height:'100%'
}));
