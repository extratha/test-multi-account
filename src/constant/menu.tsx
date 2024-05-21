import { useTranslations } from "next-intl"
import { webPaths } from "./webPaths"
import { IconHomePage, IconHomePageActive, IconLogout, IconNotification, IconSetting } from "@/assets"
export interface MenuItem {
  icon: any,
  activeIcon: any,
  path: null | string,
  title: null | string,
  children: (never | MenuItem)[] | null
}
export const aiMenuList = (): MenuItem[] => {
  const t = useTranslations('Common.menu')
  return [
    {
      icon: IconHomePage,
      activeIcon: IconHomePageActive,
      path: webPaths.home,
      title: t('home'),
      children: [],
    },
    {
      icon: null,
      activeIcon: null,
      path: '',
      title: t('aiInterpret.title'),
      children: [
        {
          icon: null,
          activeIcon: null,
          path: webPaths.aiInterpret.tryExampleData,
          title: t('aiInterpret.tryExampleData'),
          children: null
        },
        {
          icon: null,
          activeIcon: null,
          path: webPaths.aiInterpret.tryInputData,
          title: t('aiInterpret.tryInputData'),
          children: null
        },
        {
          icon: null,
          activeIcon: null,
          path: webPaths.aiInterpret.tryHospitalData,
          title: t('aiInterpret.tryHospitalData'),
          children: null
        },
      ]
    },
    // {
    //   icon: null,
    //   activeIcon: null,
    //   path: '',
    //   title: t('healthVisualization.title'),
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
    //   title: t('asr.title'),
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
    //   title: t('symtomChecker.title'),
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
  ]
}

export const settingMenuList = () :MenuItem[] => {
  const t = useTranslations('Common.menu')
  return [
    // {
    //   icon: IconSetting,
    //   activeIcon: null,
    //   path: '',
    //   title: t('settingAndOther.title'),
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
    //   title: t('notification'),
    //   children: null
    // },
    {
      icon: IconLogout,
      activeIcon: null,
      path: "",
      title: t('logout'),
      children: null
    }
  ]
}