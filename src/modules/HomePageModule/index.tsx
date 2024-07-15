"use client";
import { Stack, Typography } from "@mui/material";

import GridMenu from "@/components/Menus/GridMenu";
import { aiMenuList, MenuItem } from "@/constant/menu";
import { webPaths } from "@/constant/webPaths";
import useTranslation from "@/locales/useLocale";
import { ContentContainer, ContentContainerWrapper, TypographyPageHeadline } from "./styled";

const HomePageModule = () => {
  const { translation } = useTranslation();
  return (
    <ContentContainer>
      <ContentContainerWrapper>
        <Stack padding="2rem" spacing={3}>
          <TypographyPageHeadline variant="headerExtraLargeBold">
            {`${translation("Common.title.hello")} ${translation("Common.roles.admin")}`}
          </TypographyPageHeadline>
          <Typography variant="headerExtraLargeBold">{translation("Common.title.pleaseSelectMenu")} </Typography>
        </Stack>
        <GridMenu menus={aiMenuList(translation).filter((menu: MenuItem) => menu.path !== webPaths.home)}></GridMenu>
      </ContentContainerWrapper>
    </ContentContainer>
  );
};
export default HomePageModule;
