import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeProvider';

import '@/styles/globals.css';
import '@/styles/reset.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigProvider
      theme={{
        hashed: false,
        token: { fontSize: 16, lineHeight: 1 },
        components: {
          Tabs: {
            inkBarColor: 'transparent',
            itemActiveColor: '#121212',
            itemColor: '#121212',
            itemHoverColor: '#121212',
            itemSelectedColor: '#121212',
          },
        },
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default MyApp;
