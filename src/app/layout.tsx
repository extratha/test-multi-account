import type { Metadata } from "next";
import { ReactNode } from "react";
import { Providers } from "./provider";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Playground dashboard",
  description: "Playground dashboard",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
