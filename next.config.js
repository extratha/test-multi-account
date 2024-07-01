// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl({
  output: "standalone",
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            prettier: false,
            svgo: false,
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
            titleProp: true,
            ref: true,
          },
        },
        {
          loader: "file-loader",
          options: {
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    });

    return config;
  },
});
