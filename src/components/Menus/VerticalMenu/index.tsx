"use client";
import {
  IconCreditCoin,
  IconMenuItem,
  IconMenuItemActive,
  IconPerson,
  IconSparkle,
  ImagePlaygroundLogoColor,
  ImagePlaygroundLogoOverlay,
} from "@/assets";
import { CUSTOM_COLORS } from "@/config/config-mui/theme/colors";
import { MenuItem, aiMenuList, iconStyles, settingMenuList } from "@/constant/menu";
import { webPaths } from "@/constant/webPaths";
import { useUserProfileStore } from "@/store";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Collapse, Divider, List, ListItem, Stack, Typography, useTheme } from "@mui/material";
import { deleteCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileInfoBox, VerticalMenuContainer } from "./styled";
const VerticalMenu = () => {
  const t = useTranslations("Common");
  const [isMenuExpand, setIsMenuExpand] = useState<number[]>([]);
  const { data, resetUserProfile } = useUserProfileStore();
  const theme = useTheme();
  const pathname = usePathname();
  const { locale } = useParams();
  const router = useRouter();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const onClickExpandMenu = (menuIndex: number) => {
    if (isMenuExpand.some((index) => index === menuIndex)) {
      setIsMenuExpand(isMenuExpand.filter((index) => index !== menuIndex));
    } else {
      setIsMenuExpand([...isMenuExpand, menuIndex]);
    }
  };
  const excludePath = [
    webPaths.login,
    webPaths.forgetPassword,
    webPaths.setNewPassword,
    webPaths.termsAndCons,
    webPaths.aiInterpret.tryInputData,
    webPaths.aiInterpret.aiInterpretResult,
  ];

  useEffect(() => {
    const currentPath = pathname.split(`/${locale}`)[1];
    setIsShowMenu(!excludePath.includes(currentPath));
  }, [pathname]);
  const handleClickHeadMenu = (menu: MenuItem) => {
    if (menu?.title?.includes(t("menu.logout"))) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("passwordChanged");
      resetUserProfile();
      router.replace(webPaths.login);
      return;
    }
    if (menu.path) {
      router.push(menu.path);
    }
  };
  const handleClickSubmenu = (subMenu: MenuItem) => {
    if (subMenu.path) {
      router.push(subMenu.path);
    }
  };
  const MenuRenderer = (meuList: MenuItem[]) => {
    return (
      <List>
        {meuList.map((menu, index) => {
          return (
            <ListItem key={index} sx={{ padding: "16px 0" }}>
              <Stack width="100%" sx={{ cursor: "pointer" }}>
                <Stack direction="row" width="100%" onClick={() => handleClickHeadMenu(menu)}>
                  <Stack flex={1} margin="auto 16px auto 0 " maxWidth={"24px"} justifyContent={"center"}>
                    {menu.path && pathname.includes(menu.path) ? (
                      <>{menu?.activeIcon || <IconMenuItemActive style={iconStyles} />}</>
                    ) : (
                      <>{menu?.icon || <IconMenuItem style={iconStyles} />}</>
                    )}
                  </Stack>
                  <Stack justifySelf={"start"}>
                    <Typography variant="titleMedium">{menu.title}</Typography>
                  </Stack>
                  {menu.children && menu.children.length > 0 ? (
                    <Stack
                      sx={{ marginLeft: "auto" }}
                      data-testid="icon-expand"
                      onClick={() => onClickExpandMenu(index)}
                    >
                      <>
                        {isMenuExpand.some((number) => number === index) ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown></KeyboardArrowDown>
                        )}
                      </>
                    </Stack>
                  ) : null}
                </Stack>
                <Collapse
                  in={isMenuExpand.some((number) => number === index)}
                  data-testid={`menu-group-collapse-${index}`}
                >
                  <List>
                    {menu.children?.map((childrenItem, childrenIndex) => {
                      return (
                        <ListItem
                          key={childrenIndex}
                          sx={{
                            padding: "16px 40px",
                            color:
                              childrenItem.path && pathname.includes(childrenItem.path) ? "primary.lighter" : "inherit",
                          }}
                          onClick={() => handleClickSubmenu(childrenItem)}
                        >
                          <Typography variant="bodyLarge">{childrenItem.title}</Typography>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </Stack>
            </ListItem>
          );
        })}
      </List>
    );
  };
  return (
    <>
      {isShowMenu ? (
        <VerticalMenuContainer data-testid="vertical-menu-container">
          <ImagePlaygroundLogoColor style={{ margin: "0 0 1.5rem" }} />
          <Typography variant="bodyLargeSemiBold">{t("menu.aiMenus")}</Typography>
          {MenuRenderer(aiMenuList(t))}
          <Divider style={{ marginBottom: "20px" }}></Divider>
          <Typography variant="bodyLargeSemiBold">{t("menu.settingMenus")}</Typography>
          {MenuRenderer(settingMenuList(t))}
          <Divider style={{ margin: "auto 0 20px" }}></Divider>

          <ProfileInfoBox>
            <Stack height="100%">
              <Stack direction="row">
                <IconSparkle style={{ width: 20, height: 20 }} />
                <Stack
                  direction="row"
                  sx={{
                    background: theme.palette.text.primary,
                    borderRadius: "40px",
                    margin: "0 0 0 auto",
                    padding: "8px 16px",
                  }}
                >
                  <IconPerson style={{ width: 24, height: 24, margin: "auto 10px auto 0" }} />
                  <Typography variant="bodyLargeSemiBold" color={theme.palette.background.paper}>
                    {t("roles.admin")}
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{ height: "100%", color: theme.palette.background.paper, margin: "16px 0 0 0" }}>
                <Typography variant="bodyLargeSemiBold"> Admin Officer </Typography>
                <Typography variant="bodyLarge"> {data.email} </Typography>

                <Typography sx={{ margin: "auto 0 8px 0" }} variant="bodyLargeSemiBold">
                  เครดิตของฉัน{" "}
                </Typography>
                <Stack direction="row">
                  <IconCreditCoin style={{ width: "24px", height: "24px", margin: "0 1rem 0 0" }} />
                  <Typography variant="titleLargeSemiBold" color={CUSTOM_COLORS.coin}>
                    ใช้ได้ไม่จำกัด
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <ImagePlaygroundLogoOverlay
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: "140px",
                height: "140px",
              }}
            />
          </ProfileInfoBox>
        </VerticalMenuContainer>
      ) : null}
    </>
  );
};

export default VerticalMenu;
