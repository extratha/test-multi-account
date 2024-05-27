import { RenderOptions, RenderResult, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SWRConfig } from 'swr';
import { theme } from '@/config/config-mui/theme';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { NextIntlClientProvider } from 'next-intl';
import commonTh from '../../public/locales/th/common.json';
import commonEn from '../../public/locales/th/common.json';
type RenderWithProvider = (
  elm: React.ReactElement,
  renderOptions?: ProviderOptions,
) => RenderResult;

export type ProviderOptions = {
  formOptions?: Record<string, unknown>;
} & RenderOptions;

const messages = {
  ...commonTh,
  ...commonEn,
};

const renderWithProviders: RenderWithProvider = (
  component,
  renderOptions?,
  locale = 'th',
) => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MUIThemeProvider theme={theme}>
        <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
      </MUIThemeProvider>
    </NextIntlClientProvider>
  );

  return render(component, {
    wrapper,
    ...renderOptions,
  });
};

export { renderWithProviders as render, userEvent };
export * from '@testing-library/react';
