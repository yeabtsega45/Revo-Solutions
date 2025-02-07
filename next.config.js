const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "css")],
  },
  trailingSlash: true,
  devIndicators: {
    buildActivity: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, ""),
      "@common": path.resolve(__dirname, "common"),
      "@components": path.resolve(__dirname, "components"),
      "@data": path.resolve(__dirname, "data"),
      "@layouts": path.resolve(__dirname, "layouts"),
      "@pages": path.resolve(__dirname, "pages"),
      "@styles": path.resolve(__dirname, "styles"),
    };
    return config;
  },
};
