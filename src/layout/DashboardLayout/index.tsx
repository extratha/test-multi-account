import { Stack, styled } from "@mui/material";
import { ReactNode } from "react";

import { AppMenuConfig } from "@/types/model.ui";
import DashboardPanel from "./DashboardPanel";

interface DashboardLayoutProps {
  children: ReactNode;
}

const Layout = styled(Stack)({
  flex: 1,
});

const Main = styled("main")(({ theme }) => ({
  width: "100%",
  display: "flex",
  overflow: "hidden",
  backgroundColor: theme.palette.background.grayLight,
}));

const menus: AppMenuConfig[] = [
  {
    title: "เครื่องมือวิเคราะห์ข้อมูลด้วย AI",
    children: [
      {
        title: "หน้าหลัก",
        iconName: "HOME_ICON",
        key: "home",
        path: "/home",
        submenu: [],
      },
      {
        title: "AI Interpret",
        iconName: "AI_MENU_ICON",
        key: "ai-interpret",
        submenu: [
          {
            title: "ทดลองใช้ข้อมูลตัวอย่าง",
            key: "ai-interpret-try-example-data",
            path: "/ai-interpret/try-example-data",
          },
          {
            title: "ทดลองใส่ข้อมูลเอง",
            key: "ai-interpret-try-input-data",
            path: "/ai-interpret/try-input-data",
          },
        ],
      },
      {
        title: "Symptom Checker",
        iconName: "AI_MENU_ICON",
        key: "symptom-checker",
        path: "/symptom-checker",
      },
    ],
  },
  {
    title: "การตั้งค่าและอื่น ๆ",
    children: [
      {
        title: "ตั้งค่าและอื่นๆ",
        iconName: "SETTING_ICON",
        key: "settings",
        submenu: [
          {
            title: "ข้อกำหนดและเงื่อนไข",
            key: "setting-terms-and-conditions",
            path: "/settings/terms-and-conditions",
          },
          {
            title: "นโยบายความเป็นส่วนตัว",
            key: "setting-privacy-policy",
            path: "/settings/privacy-policy",
          },
        ],
      },
      {
        title: "ออกจากระบบ",
        key: "logout",
        iconName: "LOGOUT_ICON",
      },
    ],
  },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Layout direction="row">
      <DashboardPanel menuList={menus} />
      <Main>{children}</Main>
    </Layout>
  );
};

export default DashboardLayout;
