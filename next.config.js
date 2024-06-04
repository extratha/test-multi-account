/* eslint-disable turbo/no-undeclared-env-vars */

const env = {
  API_BASE_PATH: process.env.NEXT_PUBLIC_API_BASE_PATH ?? "MOCK_NEXT_PUBLIC_API_BASE_PATH",
  BASE_DOMAIN_URL: process.env.NEXT_PUBLIC_BASE_DOMAIN_URL ?? 'MOCK_NEXT_PUBLIC_BASE_DOMAIN_URL',
  FIREBASE: {
    API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? 'MOCK_NEXT_PUBLIC_FIREBASE_API_KEY',
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'MOCK_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'MOCK_NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? 'MOCK_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? 'MOCK_NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? 'MOCK_NEXT_PUBLIC_FIREBASE_APP_ID',
    MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? 'MOCK_NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'
  }
};

const nextConfig = {
  output: "standalone",
  reactStrictMode: false,

  publicRuntimeConfig: {
    apiUrl: env.API_BASE_PATH,
    domainUrl: env.BASE_DOMAIN_URL,
    firebase: {
      apiKey: env.FIREBASE.API_KEY,
      authDomain: env.FIREBASE.AUTH_DOMAIN,
      projectId: env.FIREBASE.PROJECT_ID,
      storageBucket: env.FIREBASE.STORAGE_BUCKET,
      messagingSenderId: env.FIREBASE.MESSAGING_SENDER_ID,
      appId: env.FIREBASE.APP_ID,
      measurementId: env.FIREBASE.MEASUREMENT_ID
    }
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