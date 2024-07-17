import { ReactNode } from "react";

import { LOCALE_LANGUAGE } from "@/config";
import ThemeProvider from "@/config/muiTheme/ThemeProvider";
import ApplicationLayout from "@/layout/ApplicationLayout";
import LocalesProvider from "@/locales/LocalesProvider";

interface RootLayoutProps {
  children: ReactNode;
}

const AppLayout = async ({ children }: RootLayoutProps) => {
  const locale = await import("@/locales/th.json");
  return (
    <LocalesProvider lang={LOCALE_LANGUAGE.TH} resource={locale.default}>
      <html lang={LOCALE_LANGUAGE.TH} suppressHydrationWarning>
        <body>
          <ThemeProvider>
            <ApplicationLayout>{children}</ApplicationLayout>
          </ThemeProvider>
        </body>
      </html>
    </LocalesProvider>
  );
};

export default AppLayout;
