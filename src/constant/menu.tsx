"use client";
import { IconHomePage, IconHomePageActive } from "@/assets";
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
