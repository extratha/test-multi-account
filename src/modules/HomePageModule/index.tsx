'use client'
import GridMenu from "@/components/Menus/GridMenu";
import { CustomContainer } from "./styled";
import { aiMenuList, MenuItem } from "@/constant/menu";
import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { webPaths } from "@/constant/webPaths";

const HomePageModule = () => {
  const t = useTranslations('Common')
  return (
    <>
      <Stack height='100%' width='100%' padding='2rem'>
        <CustomContainer>
          <Stack padding='2rem' spacing={3}>
            <Typography
              variant='displayMediumSemiBold'
              sx={{
                width: 'fit-content',
                background: 'linear-gradient(90deg, #023781 0%, #028DF5 50%, #01EAFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
              }}
            >
              {`${t('title.hello')} ${t('roles.admin')}`}
            </Typography>
            <Typography variant='displayMediumSemiBold'>{t('title.pleaseSelectMenu')} </Typography>
          </Stack>
          <GridMenu menus={aiMenuList().filter((menu: MenuItem) => menu.path !== webPaths.home)}></GridMenu>
        </CustomContainer>
      </Stack>

    </>
  )
}
export default HomePageModule;