export const staticEnvConfig = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_BASE_PATH ?? 'MOCK_NEXT_PUBLIC_API_BASE_PATH',
  domainUrl:
    process.env.NEXT_PUBLIC_BASE_DOMAIN_URL ??
    'MOCK_NEXT_PUBLIC_BASE_DOMAIN_URL',
};
