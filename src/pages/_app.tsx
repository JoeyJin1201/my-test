import Layout from '@/components/common/Layout';
import '@/styles/globals.css'; // 引入全局樣式
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
