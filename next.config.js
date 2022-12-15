const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')

const bundleAnalyzer = withBundleAnalyzer({enabled: process.env.ANALYZE === 'true'})

const devMode = process.env.NODE_ENV === 'development' ? true : false;

const nextConfig = {
  reactStrictMode: true,
  env: {
    CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
    CRYPTO_SECRET_IV: process.env.CRYPTO_SECRET_IV,
    QRNG_API_KEY: process.env.QRNG_API_KEY,
  },
  swcMinify: true,
  compiler: {
    removeConsole: !devMode,
  },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  webpack(config, options) {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    },{
      test: /\.txt$/i,
      use: [
        {
          loader: 'raw-loader',
          options: {
            esModule: false,
          },
        },
      ],
    },
    {
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    }
    );
    return config;
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/qr',
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ]
  // }
}

module.exports = withPlugins([[bundleAnalyzer]], nextConfig)