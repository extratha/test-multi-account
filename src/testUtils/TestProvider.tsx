import { ThemeProvider } from "@emotion/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

import ModalLayer from "@/components/Modal/ModalLayer";
import { theme } from "@/config/config-mui";
import aiInterpretEn from "../../public/locales/en/aiInterpret.json";
import aiInterpretTh from "../../public/locales/th/aiInterpret.json";
import { default as commonEn, default as commonTh } from "../../public/locales/th/common.json";

const messages = {
  ...commonTh,
  ...commonEn,
  ...aiInterpretTh,
  ...aiInterpretEn,
};

interface TestProviderProps {
  children?: ReactNode;
}

export const TestProvider = ({ children }: TestProviderProps) => {
  return (
    <NextIntlClientProvider locale="th" messages={messages}>
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
        <ModalLayer />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};
