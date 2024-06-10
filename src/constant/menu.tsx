"use client";
import { IconHomePage, IconHomePageActive, IconLogout } from "@/assets";
import { webPaths } from "./webPaths";

export interface MenuItem {
  icon: any;
  activeIcon: any;
  path: null | string;
  title: null | string;
  children: (never | MenuItem)[] | null;
}
type TFunction = (key: string) => string;
export const aiMenuList = (t: TFunction): MenuItem[] => {
  return [
    {
      icon: IconHomePage,
      activeIcon: IconHomePageActive,
      path: webPaths.home,
      title: t("menu.home"),
      children: [],
    },
    {
      icon: null,
      activeIcon: null,
      path: webPaths.aiInterpret.tryExampleData,
      title: t("menu.aiInterpret.title"),
      children: [
        {
          icon: null,
          activeIcon: null,
          path: webPaths.aiInterpret.tryExampleData,
          title: t("menu.aiInterpret.tryExampleData"),
          children: null,
        },
        {
          icon: null,
          activeIcon: null,
          path: webPaths.aiInterpret.tryInputData,
          title: t("menu.aiInterpret.tryInputData"),
          children: null,
        },
        {
          icon: null,
          activeIcon: null,
          path: webPaths.aiInterpret.tryHospitalData,
          title: t("menu.aiInterpret.tryHospitalData"),
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
    // {
    //   icon: null,
    //   activeIcon: null,
    //   path: '',
    //   title: t('menu.symtomChecker.title'),
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
  ];
};

export const settingMenuList = (t: TFunction): MenuItem[] => {
  return [
    // {
    //   icon: IconSetting,
    //   activeIcon: null,
    //   path: '',
    //   title: t('menu.settingAndOther.title'),
    //   children: [
    //     {
    //       icon: null,
    //       activeIcon: null,
    //       path: '',
    //       title: '',
    //       children: null
    //     }
    //   ]
    // },
    // {
    //   icon: IconNotification,
    //   activeIcon: null,
    //   path: "",
    //   title: t('menu.notification'),
    //   children: null
    // },
    {
      icon: IconLogout,
      activeIcon: null,
      path: "",
      title: t("menu.logout"),
      children: null,
    },
  ];
};
