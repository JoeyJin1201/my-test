import { StyleProvider, createCache } from '@ant-design/cssinjs';
import { ConfigProvider, Spin } from 'antd';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider, useTheme } from '@/context/ThemeProvider';

import '@/styles/globals.css';
import '@/styles/reset.css';

const cache = createCache();

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        hashed: false,
        token: { fontSize: 16, lineHeight: 1 },
        components: {
          Tabs: {
            inkBarColor: 'transparent',
            itemActiveColor: '#121212',
            itemColor: theme === 'light' ? '#121212' : '#ffffff',
            itemHoverColor: theme === 'light' ? '#333333' : '#cccccc',
            itemSelectedColor: theme === 'light' ? '#000000' : '#ffffff',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Spin spinning size="large" />
      </div>
    );
  }

  return (
    <StyleProvider cache={cache}>
      <ThemeProvider>
        <ThemeWrapper>
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
        </ThemeWrapper>
      </ThemeProvider>
    </StyleProvider>
  );
};

export default MyApp;
