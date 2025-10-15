import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  outputFileTracingRoot: process.env.OUTPUT_FILE_TRACING_ROOT || '../..',
  serverExternalPackages: [],

  compress: true,
  poweredByHeader: false,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (config.mode === 'production') {
      config.optimization = {
        ...config.optimization,
        minimize: true,
      };
    }

    return config;
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'next-intl'],
    optimizeCss: true,
  },

  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
};

export default withNextIntl(nextConfig);
