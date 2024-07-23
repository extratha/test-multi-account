import { Divider as MuiDivider, List as MuiList, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { PlaygroundLogoColor } from "@/assets";
import { MENU_CONDITION, NAVIGATION, SESSION } from "@/constant";
import { useUserProfileStore } from "@/store";
import { AppMenuConfig, MenuItemConfig } from "@/types/model.ui";
import { removeStorage } from "@/utils/common";
import DashboardPanelMenu from "./DashboardPanelMenu";
import DashboardUserInformation from "./DashboardUserInformation";

interface DashboardPanelProps {
  menuList: AppMenuConfig[];
}

const DashboardMenu = styled("nav")({
  width: "100%",
  maxWidth: "280px",
  display: "flex",
  flexDirection: "column",
  overflowX: "hidden",
  overflowY: "auto",
});

const AppLogo = styled(Stack)({
  padding: "24px 20px 12px",
});

const List = styled(MuiList)({
  padding: "8px 0px",
});

const Divider = styled(MuiDivider)({
  margin: "0px 20px",
});

const SubHeader = styled(Typography)({
  padding: "12px 20px",
}) as typeof Typography;

const DashboardPanel = ({ menuList }: DashboardPanelProps) => {
  const router = useRouter();
  const { resetUserProfile } = useUserProfileStore();

  const [showSubmenu, setShowSubmenu] = useState("");

  const onLogout = () => {
    removeStorage(SESSION.ACCESS_TOKEN);
    removeStorage(SESSION.REFRESH_TOKEN);
    resetUserProfile();
    router.replace(NAVIGATION.LOGIN);
  };

  const handleCLickMenuItem = (item: MenuItemConfig) => {
    if (item.key === MENU_CONDITION.LOGOUT) {
      onLogout();
    } else {
      setShowSubmenu((state) => (state === item.key ? "" : item.key));
    }
  };

  return (
    <DashboardMenu>
      <AppLogo>
        <PlaygroundLogoColor />
      </AppLogo>
      <Stack flex="1" divider={<Divider />}>
        {menuList.map((menu, index) => (
          <List
            key={index}
            subheader={
              <SubHeader component="div" variant="labelExtraSmallMedium">
                {menu.title}
              </SubHeader>
            }
          >
            {menu.children.map((item, itemIndex) => (
              <DashboardPanelMenu
                key={itemIndex}
                item={item}
                openSubmenu={showSubmenu.includes(item.key)}
                onClickItem={() => handleCLickMenuItem(item)}
              />
            ))}
          </List>
        ))}
      </Stack>
      <Divider />
      <DashboardUserInformation />
    </DashboardMenu>
  );
};

export default DashboardPanel;
