import { Divider as MuiDivider, List as MuiList, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { PlaygroundLogoColor } from "@/assets";
import Dialog from "@/components/Dialog";
import { MENU_CONDITION, NAVIGATION, SESSION } from "@/constant";
import useTranslation from "@/locales/useLocale";
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

const LogoutDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    minHeight: "240px",
  },
  "& .dialog-title": {
    textAlign: "left",
    padding: "24px 24px 8px",
  },
  "& .dialog-content": {
    textAlign: "left",
  },
});

const DashboardPanel = ({ menuList }: DashboardPanelProps) => {
  const router = useRouter();

  const [showSubmenu, setShowSubmenu] = useState("");
  const [isLogoutDialog, setIsLogoutDialog] = useState(false);
  const { translation } = useTranslation();

  const onLogout = () => {
    setIsLogoutDialog(false);
    removeStorage(SESSION.ACCESS_TOKEN);
    removeStorage(SESSION.REFRESH_TOKEN);
    router.replace(NAVIGATION.LOGIN);
  };

  const onCloseLogout = () => {
    setIsLogoutDialog(false);
  };

  const handleCLickMenuItem = (item: MenuItemConfig) => {
    if (item.key === MENU_CONDITION.LOGOUT) {
      setIsLogoutDialog(true);
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
      <LogoutDialog
        name="logout"
        open={isLogoutDialog}
        title={translation("Common.menu.logout")}
        description={translation("Common.message.confirmLogout")}
        confirm={translation("Common.button.confirm")}
        cancel={translation("Common.button.back")}
        onConfirm={onLogout}
        onCancel={onCloseLogout}
      />
      <DashboardUserInformation />
    </DashboardMenu>
  );
};

export default DashboardPanel;
