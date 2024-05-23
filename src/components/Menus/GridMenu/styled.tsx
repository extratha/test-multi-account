import { styled, Stack } from "@mui/material"

export const CustomMenuItemWrapperStyle = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: '20px',
  padding: '16px',
  justifyContent:'center',
  alignItems:'center',
  height:'100%',
  width:'100%',
}));