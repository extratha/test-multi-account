/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Provider from "./provider";
import VerticalMenu from "@/components/Menus/VerticalMenu";
import { Stack } from "@mui/material";


type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

const getMessages = async (locale: string) => {
  try {
    return {
      ...(await import(`../../../public/locales/${locale}/common.json`)).default,
      ...(await import(`../../../public/locales/${locale}/aiInterpret.json`)).default,
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
          <Stack direction='row' width='100%'>
            <VerticalMenu></VerticalMenu>
            <Stack width='100%' alignItems={'center'} >
              <Provider>
                {children}
              </Provider>
            </Stack>
          </Stack>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
