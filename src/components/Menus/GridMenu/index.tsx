'use client'

import { Grid, MenuClassKey, Stack, Typography, useTheme } from "@mui/material";
import { MenuItem } from "@/constant/menu";
import Image from "next/image";
import { IconMenuItem } from "@/assets";
import { CustomMenuItemWrapperStyle } from "./styled";
import { useTranslations } from "next-intl";


const GridMenu: React.FC<{ menus: MenuItem[] }> = ({ menus }) => {
  const theme = useTheme()
  const t = useTranslations('Common')
  const MenuRenderer = () => {
    const iconHeight = 48
    return (
      <>
        {menus.map((menu, index) => {
          return (
            <Grid 
            item 
            xs={4} 
            sx={{ 
              display: 'flex', 
              width: '100%', 
              height: '300px' 
            }}
            key={index}
            >
              <CustomMenuItemWrapperStyle spacing={2}>
                <Image alt='' src={IconMenuItem} style={{ width: iconHeight, height: iconHeight, margin: "0 0 8px 0" }} />
                <Typography variant='titleLargeSemiBold' textAlign="center">{menu.title}</Typography>
                <Typography variant='bodyLarge' color={theme.palette.grey[600]} >{t('text.interpret')}</Typography>
              </CustomMenuItemWrapperStyle>
            </Grid>
          )
        })}
      </>
    )
  }
  return (
    <>
      <Grid container spacing={3} alignItems={'stretch'}>
        {MenuRenderer()}
      </Grid>
    </>
  )
}

export default GridMenu;