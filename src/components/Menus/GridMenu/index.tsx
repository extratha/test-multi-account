"use client";

import { IconAiInterpret } from "@/assets";
import { MenuItem } from "@/constant/menu";
import { Grid, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CustomMenuItemWrapperStyle } from "./styled";

const GridMenu: React.FC<{ menus: MenuItem[] }> = ({ menus }) => {
  const theme = useTheme();
  const t = useTranslations("Common");
  const router = useRouter();
  const handleClickMenuGridItemMenu = (menu: MenuItem) => {
    if (menu.path) {
      router.push(menu.path);
    }
  };
  const MenuRenderer = () => {
    const iconHeight = 48;
    return (
      <>
        {menus.map((menu, index) => {
          return (
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
              <CustomMenuItemWrapperStyle spacing={2} onClick={() => handleClickMenuGridItemMenu(menu)}>
                <Image
                  alt=""
                  src={IconAiInterpret}
                  style={{ width: iconHeight, height: iconHeight, margin: "0 0 8px 0" }}
                />
                <Typography variant="titleLargeSemiBold" textAlign="center">
                  {menu.title}
                </Typography>
                <Typography variant="bodyLarge" color={theme.palette.grey[600]}>
                  {t("text.interpret")}
                </Typography>
              </CustomMenuItemWrapperStyle>
            </Grid>
          );
        })}
      </>
    );
  };
  return (
    <>
      <Grid container spacing={3} alignItems={"stretch"}>
        {MenuRenderer()}
      </Grid>
    </>
  );
};

export default GridMenu;
