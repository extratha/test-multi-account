import { ReactNode } from "react";

import { IconAiInterpret, IconHomePage, IconLogout, IconSetting } from "@/assets";

export const MENU_ICON: Record<string, ReactNode> = {
  HOME_ICON: <IconHomePage />,
  AI_MENU_ICON: <IconAiInterpret />,
  SETTING_ICON: <IconSetting />,
  LOGOUT_ICON: <IconLogout />,
};
