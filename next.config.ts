/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-util',
    'rc-motion',
    'rc-trigger',
    'rc-pagination',
    'rc-picker',
    'rc-input',
    'rc-tree',
    'rc-table',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
