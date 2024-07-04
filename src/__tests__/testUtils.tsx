import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { RenderOptions, RenderResult, act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import flushPromises from "flush-promises";
import { NextIntlClientProvider } from "next-intl";
import * as NextNavigation from "next/navigation";
import { SWRConfig } from "swr";

import ModalLayer from "@/components/Modal/ModalLayer";
import { theme } from "@/config/config-mui/theme";
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
        <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
        <ModalLayer />
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

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
  useParams: jest.fn(),
  useSearchParams: jest.fn(),
}));

export interface SpyUseSearchParams {
  get: jest.Mock;
}

export interface SpyUseRouter {
  replace: jest.Mock;
  push: jest.Mock;
  back: jest.Mock;
}

export const spyUseParams = () => {
  jest.spyOn(NextNavigation, "useParams").mockReturnValue({});
  return NextNavigation.useParams as jest.Mock;
};

export const spyUseRouter = (): SpyUseRouter => {
  const replace = jest.fn();
  const push = jest.fn();
  const back = jest.fn();
  jest.spyOn(NextNavigation, "useRouter").mockReturnValue({ replace, push, back } as any);
  return { replace, push, back };
};

export const spyUseSearchParams = (): SpyUseSearchParams => {
  const get = jest.fn();
  jest.spyOn(NextNavigation, "useSearchParams").mockReturnValue({ get } as any);
  return {
    get,
  };
};

export const API = {
  AI_INTERPRET_URL: "/lab/examples/interpretId",
  SUBMIT_HEALTH_DATA_URI: "/lab/interprets",
  CONSENT: "/consents",
  TERMS_AND_CONDITIONS: "/consents/terms-conditions",
};

const MockMarkdown = (props: any) => {
  return <div {...props} />;
};

jest.mock("react-markdown", () => MockMarkdown);

export const advanceTimersByTime = async (time: number) => {
  await act(async () => {
    jest.advanceTimersByTime(time);
  });
};

export const setMockDate = (date: string) => {
  jest.setSystemTime(dayjs(date).valueOf());
};
