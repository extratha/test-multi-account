import { NextRequest } from 'next/server';
import { useTranslations } from 'next-intl';
import { defaultLocale, locales } from '@/i18n';

const resolveLocale = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const [, locale] = pathname.split('/');

  if (!locales.includes(locale)) {
    return defaultLocale;
  }
  return locale ;
};

export { useTranslations, resolveLocale };
