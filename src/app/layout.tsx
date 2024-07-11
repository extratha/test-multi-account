import { ReactNode } from "react";

import "../styles/globals.css";

import { LOCALE_LANGUAGE } from "@/config/i18n";
import LocalesProvider from "@/locales/LocalesProvider";
import Configuration from "@/components/Configuration";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const locale = await import("@/locales/th.json");

  return (
    <LocalesProvider lang={LOCALE_LANGUAGE.TH} resource={locale.default}>
      <html lang={LOCALE_LANGUAGE.TH} suppressHydrationWarning>
        <body>
          <Configuration>{children}</Configuration>
        </body>
      </html>
    </LocalesProvider>
  );
};

export default Layout;
