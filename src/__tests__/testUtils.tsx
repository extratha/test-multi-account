import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { RenderOptions, RenderResult, act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import flushPromises from "flush-promises";
import { NextIntlClientProvider } from "next-intl";
import { SWRConfig } from "swr";

import { theme } from "@/config/config-mui/theme";
import { InterpretInputDataProvider } from "@/contexts/InterpretInputDataContext";
import aiInterpretEn from "../../public/locales/en/aiInterpret.json";
import aiInterpretTh from "../../public/locales/th/aiInterpret.json";
import { default as commonEn, default as commonTh } from "../../public/locales/th/common.json";

type RenderWithProvider = (elm: React.ReactElement, renderOptions?: ProviderOptions) => RenderResult;

export type ProviderOptions = {
  formOptions?: Record<string, unknown>;
} & RenderOptions;

const messages = {
  ...commonTh,
  ...commonEn,
  ...aiInterpretTh,
  ...aiInterpretEn,
};

const renderWithProviders: RenderWithProvider = (component, renderOptions?, locale = "th") => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MUIThemeProvider theme={theme}>
        <InterpretInputDataProvider>
          <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
        </InterpretInputDataProvider>
      </MUIThemeProvider>
    </NextIntlClientProvider>
  );

  return render(component, {
    wrapper,
    ...renderOptions,
    hydrate: false,
  });
};

export const flushPromise = async () => {
  await act(async () => {
    await flushPromises();
  });
};

export * from "@testing-library/react";
export { renderWithProviders as render, userEvent };
