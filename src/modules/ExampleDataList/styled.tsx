import { NEUTRAL } from "@/config/config-mui/theme/colors";
import { styled, Stack, Button } from "@mui/material"

export const TagValueStyle = styled(Stack)(() => ({
    padding: '8px',
    background: NEUTRAL[99],
    borderRadius: '8px'
}));

export const ButtonEditDataStyled = styled(Button)(({theme}) => ({
    padding:10,
    height:40,
    borderRadius: '10px',
    border: `1px solid ${theme.palette.grey[400]}`
}));

export const ButtonInterpretDataStyled = styled(Button)(({theme}) => ({
    padding:10,
    height:40,
    borderRadius: '10px',
    boxShadow: `2px 2px 6px 0px ${NEUTRAL[80]}`,
    background: 'linear-gradient(180deg, rgba(0,89,214,1) 0%, rgba(2,141,245,1) 50%, rgba(0,203,221,1) 100%)',
}));