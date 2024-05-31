import { resolveLocale, useTranslations } from '@/utils/resolveLocale';
import { NextRequest } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';
import { defaultLocale } from '@/i18n';

describe('resolveLocale', () => {
  const createNextRequest = (pathname: string): NextRequest => {
    const nextUrl = new NextURL(`http://localhost${pathname}`);
    return { nextUrl } as NextRequest;
  };

  it('returns default locale when locale is not included in the pathname', () => {
    const req = createNextRequest('/');
    expect(resolveLocale(req)).toBe('th'); 
    expect(useTranslations).not.toBeNull();
  });
  it('returns default locale when locale is not included in the localses', () => {
    const req = createNextRequest('/fr');
    expect(resolveLocale(req)).toBe(defaultLocale); 
  });
  it('returns default locale when locale is empty in the pathname', () => {
    const req = createNextRequest('/en/');
    expect(resolveLocale(req)).toBe('en');
  });
  it('returns default locale when pathname is invalid', () => {
    const req = createNextRequest('');
    expect(resolveLocale(req)).toBe('th');
  });
  it('returns default locale when no locale', () => {
    let req = createNextRequest('//home');
    expect(resolveLocale(req)).toBe(defaultLocale);
    req = createNextRequest('/fr/home');
    expect(resolveLocale(req)).toBe(defaultLocale);
    req = createNextRequest('/th/home');
    expect(resolveLocale(req)).toBe(defaultLocale);
  });


  
});