import {
  Collapse,
  List,
  ListItemText,
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { IconChevronDown, IconChevronUp } from "@/assets";
import { MENU_ICON } from "@/config/menu";
import { MenuItemConfig } from "@/types/model.ui";

interface DashboardPanelMenuProps {
  item: MenuItemConfig;
  openSubmenu: boolean;
  onClickItem?: () => void;
}

interface ListItemIconProps {
  active?: boolean;
}

interface SubmenuItemTextProps {
  active?: boolean;
}

const ListItemButton = styled(MuiListItemButton)({
  padding: "4px 16px",
  "& .MuiListItemIcon-root": {
    minWidth: "0px",
    marginRight: "8px",
  },
  "&  svg": {
    width: "16px",
    height: "16px",
  },
});

const ListItemIcon = styled(MuiListItemIcon, { shouldForwardProp: (prop) => prop !== "active" })<ListItemIconProps>(
  ({ active, theme }) => [
    active && {
      color: theme.palette.primary.main,
    },
  ]
);

const SubmenuItemText = styled(ListItemText, { shouldForwardProp: (prop) => prop !== "active" })<SubmenuItemTextProps>(
  ({ active, theme }) => [
    {
      marginLeft: "24px",
    },
    active && {
      color: theme.palette.primary.main,
    },
  ]
);

const SubmenuList = styled(List)({
  padding: "4px 0px",
});

const getIsActiveMenu = (pathname: string, item: MenuItemConfig) => {
  const submenuList = item.submenu || [];

  if (submenuList.length > 0) {
    const menu = submenuList.find((item) => item.path && item.path === pathname);
    return !!menu;
  } else {
    return item.path === pathname;
  }
};

const DashboardPanelMenu = ({ item, openSubmenu, onClickItem }: DashboardPanelMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActiveMenu = useMemo(() => getIsActiveMenu(pathname, item), [pathname]);

  const submenuList = item.submenu || [];
  const isShowSubmenu = submenuList.length > 0;
  const isOpenSubmenu = openSubmenu || isActiveMenu;

  const handleClickMenuItem = (menu: MenuItemConfig) => {
    if (menu.path) {
      router.replace(menu.path);
    }
  };

  const handleClickMenu = () => {
    if (onClickItem) onClickItem();
    handleClickMenuItem(item);
  };

  useEffect(() => {
    if (isActiveMenu && onClickItem) {
      onClickItem();
    }
  }, []);

  return (
    <Stack>
      <ListItemButton onClick={handleClickMenu}>
        {item.iconName && <ListItemIcon active={isActiveMenu}>{MENU_ICON[item.iconName]}</ListItemIcon>}
        <ListItemText>
          <Typography variant="bodySmallMedium">{item.title}</Typography>
        </ListItemText>
        {isShowSubmenu && <>{isOpenSubmenu ? <IconChevronUp /> : <IconChevronDown />}</>}
      </ListItemButton>
      {isShowSubmenu && (
        <Collapse in={isOpenSubmenu}>
          <SubmenuList>
            {submenuList.map((menu, submenuIndex) => (
              <ListItemButton key={submenuIndex} onClick={() => handleClickMenuItem(menu)}>
                <SubmenuItemText active={pathname === menu.path}>
                  <Typography variant="bodySmall">{menu.title}</Typography>
                </SubmenuItemText>
              </ListItemButton>
            ))}
          </SubmenuList>
        </Collapse>
      )}
    </Stack>
  );
};

export default DashboardPanelMenu;
