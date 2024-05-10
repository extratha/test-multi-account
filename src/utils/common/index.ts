import {
  STATUS_NORMAL,
  STATUS_ABNORMAL,
} from '@/config/config-mui/theme/colors';
export const getFontColorByStatus = (
  result: Record<string, any>,
  statusKey: string,
) => {
  if (!result || !result[statusKey]) return 'inherit';
  const status = result[statusKey].toString().toLowerCase();
  if (status === 'abnormal') return STATUS_ABNORMAL[2];
  else if (status === 'normal') return STATUS_NORMAL[1];
  return 'inherit';
};

export const removeZOfDateTime = (value: string) => {
  if (!value) return value;
  return value.split('Z')[0];
};

export function isBeforeLastIndex(array: Record<string, any>[], index: number) {
  return index < array.length - 1;
}

export function removeLanguagePath(url: string): string {
  const languagePathPattern = /^\/\w{2}\//;

  const cleanedUrl = url.replace(languagePathPattern, '/');

  return cleanedUrl;
}
