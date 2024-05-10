/* eslint-disable turbo/no-undeclared-env-vars */

const env = {
  API_BASE_PATH: process.env.NEXT_PUBLIC_API_BASE_PATH ?? "MOCK_NEXT_PUBLIC_API_BASE_PATH",
  BASE_DOMAIN_URL: process.env.NEXT_PUBLIC_BASE_DOMAIN_URL ??
  'MOCK_NEXT_PUBLIC_BASE_DOMAIN_URL',
};

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,

  publicRuntimeConfig: {
    apiUrl: env.API_BASE_PATH,
    domainUrl: env.BASE_DOMAIN_URL
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        resourceQuery: { not: /url/ },
        use: {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
          },
        },
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

const withNextIntl = require('next-intl/plugin')();
module.exports = {  ...nextConfig, ...withNextIntl({
  nextConfig
  // Other Next.js configuration ...
})};