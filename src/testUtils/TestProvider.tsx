import { ThemeProvider } from "@emotion/react";

import { ReactNode } from "react";
import { SWRConfig } from "swr";

import ModalLayer from "@/components/Modal/ModalLayer";
import { theme } from "@/config/config-mui";

interface TestProviderProps {
  children?: ReactNode;
}

export const TestProvider = ({ children }: TestProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
      <ModalLayer />
    </ThemeProvider>
  );
};
