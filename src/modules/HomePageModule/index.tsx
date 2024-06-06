'use client'
import GridMenu from "@/components/Menus/GridMenu";
import { ContentContainer, ContentContainerWrapper, TypographyPageHeadline } from "./styled";
import { aiMenuList, MenuItem } from "@/constant/menu";
import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { webPaths } from "@/constant/webPaths";

const HomePageModule = () => {
  const t = useTranslations('Common')
  return (
    <>
      <ContentContainer>
        <ContentContainerWrapper>
          <Stack padding='2rem' spacing={3}>
            <TypographyPageHeadline
              variant='displayMediumSemiBold'
            >
              {`${t('title.hello')} ${t('roles.admin')}`}
            </TypographyPageHeadline>
            <Typography variant='displayMediumSemiBold'>{t('title.pleaseSelectMenu')} </Typography>
          </Stack>
          <GridMenu menus={aiMenuList(t).filter((menu: MenuItem) => menu.path !== webPaths.home)}></GridMenu>
        </ContentContainerWrapper>
      </ContentContainer>

    </>
  )
}
export default HomePageModule;