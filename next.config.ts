/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
};

module.exports = nextConfig;
