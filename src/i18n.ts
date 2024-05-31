import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['th', 'en'];
export const defaultLocale = 'th';
export default getRequestConfig(async (params) => {
  if (!locales.includes(params.locale as string)) {
    return notFound();
  }
  const { locale } = params;
  return {
    messages: {
      ...(await import(`../public/locales/${locale}/common.json`)).default,
    },
  };
});
