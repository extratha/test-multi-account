"use client";

import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { IconAiInterpret } from "@/assets";
import { MenuItem } from "@/constant/menu";
import useTranslation from "@/locales/useLocale";
import { CustomMenuItemWrapperStyle } from "./styled";

const GridMenu: React.FC<{ menus: MenuItem[] }> = ({ menus }) => {
  const { translation } = useTranslation();
  const router = useRouter();
  const iconHeight = 48;

  const handleClickMenuGridItemMenu = (menu: MenuItem) => {
    if (menu.path) {
      router.replace(menu.path);
    }
  };

  return (
    <Grid container spacing={3} alignItems={"stretch"}>
      {menus.map((menu, index) => (
        <Grid
          data-testid={`menu-item-${index}`}
          item
          xs={4}
          sx={{
            display: "flex",
            width: "100%",
            height: "260px",
          }}
          key={index}
        >
          <CustomMenuItemWrapperStyle spacing="4px" onClick={() => handleClickMenuGridItemMenu(menu)}>
            <IconAiInterpret style={{ width: iconHeight, height: iconHeight, margin: "0 0 16px 0" }} />
            <Typography variant="bodyBold" textAlign="center">
              {menu.title}
            </Typography>
            <Typography variant="bodySmall" color="blueGrey.500">
              {translation("Common.text.interpret")}
            </Typography>
          </CustomMenuItemWrapperStyle>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridMenu;
