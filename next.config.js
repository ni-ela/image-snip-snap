module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], 
  },
  env: {
    CUSTOM_KEY: 'my-custom-value', 
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};