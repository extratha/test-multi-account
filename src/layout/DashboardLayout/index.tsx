"use client";

import { Stack, styled } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

import { usePageLoadingStore } from "@/store";
import { AppMenuConfig } from "@/types/model.ui";
import { getDashboardMenuConfig } from "@/utils/firebase";
import DashboardPanel from "./DashboardPanel";

interface DashboardLayoutProps {
  children: ReactNode;
}

const Layout = styled(Stack)({
  width: "100%",
  height: "100%",
});

const Main = styled("main")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  overflow: "hidden",
  backgroundColor: theme.palette.background.grayLight,
}));

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { setPageLoading } = usePageLoadingStore();
  const [isLoading, setIsLoading] = useState(true);
  const [menus, setMenus] = useState<AppMenuConfig[]>([]);

  const fetchMenuConfig = async () => {
    try {
      setPageLoading(true);

      const remoteConfig = await getDashboardMenuConfig();
      setMenus(remoteConfig.menu);
      setIsLoading(false);
      setPageLoading(false);
    } catch (error) {
      setIsLoading(false);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuConfig();
  }, []);

  return (
    <>
      {!isLoading && (
        <Layout direction="row">
          <DashboardPanel menuList={menus} />
          <Main>{children}</Main>
        </Layout>
      )}
    </>
  );
};

export default DashboardLayout;
