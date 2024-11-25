import Layout from '@/components/common/Layout';
import '@/styles/globals.css'; // 引入全局樣式
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/context/ThemeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
