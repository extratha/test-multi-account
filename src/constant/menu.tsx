"use client";
import { IconHomePage, IconHomePageActive, IconLogout, IconSetting } from "@/assets";
import { webPaths } from "./webPaths";

export interface MenuItem {
  icon: any;
  activeIcon: any;
  path: null | string;
  title: null | string;
  children: (never | MenuItem)[] | null;
}
type TFunction = (key: string) => string;

export const iconSize = 24;
export const iconStyles = {
  width: iconSize,
  height: iconSize,
};

export const aiMenuList = (t: TFunction): MenuItem[] => {
  return [
    {
      icon: <IconHomePage style={iconStyles} />,
      activeIcon: <IconHomePageActive style={iconStyles} />,
      path: webPaths.home,
      title: t("Common.menu.home"),
      children: [],
    },
    {
      icon: null,
      activeIcon: null,
      path: webPaths.aiInterpret.tryExampleData,
      title: t("Common.menu.aiInterpret.title"),
      children: [
        {
          icon: null,
          activeIcon: null,
          path: webPaths.aiInterpret.tryExampleData,
          title: t("Common.menu.aiInterpret.tryExampleData"),
          children: null,
        },
        {
          icon: null,
          activeIcon: null,
          path: webPaths.aiInterpret.tryInputData,
          title: t("Common.menu.aiInterpret.tryInputData"),
          children: null,
        },
        {
          icon: null,
          activeIcon: null,
          path: webPaths.aiInterpret.tryHospitalData,
          title: t("Common.menu.aiInterpret.tryHospitalData"),
          children: null,
        },
      ],
    },
    // {
    //   icon: null,
    //   activeIcon: null,
    //   path: '',
    //   title: t('menu.healthVisualization.title'),
    //   children: [
    //     {
    //       icon: null,
    //       activeIcon: null,
    //       path: '',
    //       title: "",
    //       children: null
    //     }
    //   ],
    // },
    // {
    //   icon: null,
    //   activeIcon: null,
    //   path: '',
    //   title: t('menu.asr.title'),
    //   children: [
    //     {
    //       icon: null,
    //       activeIcon: null,
    //       path: '',
    //       title: "",
    //       children: null
    //     }
    //   ],
    // },
    {
      icon: null,
      activeIcon: null,
      path: webPaths.symptomChecker,
      title: t("Common.menu.symptomChecker.title"),
      children: [],
    },
  ];
};

export const settingMenuList = (t: TFunction): MenuItem[] => {
  return [
    {
      icon: <IconSetting width={iconSize} height={iconSize} />,
      activeIcon: null,
      path: webPaths.settingsTermsAndConditions,
      title: t("Common.menu.settingAndOther.title"),
      children: [
        {
          icon: null,
          activeIcon: null,
          path: webPaths.settingsTermsAndConditions,
          title: t("Common.menu.settingAndOther.termsAndConditions"),
          children: null,
        },
        {
          icon: null,
          activeIcon: null,
          path: webPaths.settingsPrivacyPolicy,
          title: t("Common.menu.settingAndOther.privacyPolicy"),
          children: null,
        },
      ],
    },
    // {
    //   icon: IconNotification,
    //   activeIcon: null,
    //   path: "",
    //   title: t('menu.notification'),
    //   children: null
    // },
    {
      icon: <IconLogout style={iconStyles} />,
      activeIcon: null,
      path: "",
      title: t("Common.menu.logout"),
      children: null,
    },
  ];
};
