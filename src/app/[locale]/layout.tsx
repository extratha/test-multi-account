/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Provider from "./provider";


type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

const getMessages = async (locale: string) => {
  try {
    return {
      ...(await import(`../../../public/locales/${locale}/common.json`)).default,
    };
  } catch (error) {
    notFound()
  }
};

const LocaleLayout = async ({ children, params: { locale } }: LocaleLayoutProps) => {
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider> {children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
