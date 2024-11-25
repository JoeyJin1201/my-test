import 'antd/dist/reset.css';

import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import Layout from '@/components/common/Layout/Layout';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeProvider';

import '@/styles/globals.css'; // 引入全局樣式
// import '@/styles/reset.css'; // css reset
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [currentBlock, setCurrentBlock] = useState('#profile');

  useEffect(() => {
    setCurrentBlock('#profile');
  }, []);

  useEffect(() => {
    console.log(currentBlock);
  }, [currentBlock]);

  return (
    <ConfigProvider
      theme={{
        hashed: false,
        token: {
          lineHeight: 1,
        },
        components: {
          Anchor: {
            linkPaddingBlock: 0,
            linkPaddingInlineStart: 0,
          },
          Layout: {
            // headerBg: 'white',
          },
        },
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <Layout currentBlock={currentBlock} setCurrentBlock={setCurrentBlock}>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default MyApp;
